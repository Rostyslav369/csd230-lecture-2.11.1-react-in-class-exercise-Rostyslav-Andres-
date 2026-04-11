import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

const String baseUrl =
    'https://csd230-lecture-2-11-1-react-in-class-dee5.onrender.com/api';

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'CloudShelf Mobile',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const HomePage(),
    );
  }
}

class Cart {
  static List<Map<String, dynamic>> items = [];

  static double get totalPrice {
    double total = 0;
    for (var item in items) {
      total += (item['price'] as num).toDouble() * item['quantity'];
    }
    return total;
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int selectedIndex = 0;

  final pages = const [
    ProductPage(endpoint: 'books', title: 'Books'),
    ProductPage(endpoint: 'movies', title: 'Movies'),
    ProductPage(endpoint: 'games', title: 'Games'),
    ProductPage(endpoint: 'magazines', title: 'Magazines'),
    CartPage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: pages[selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: selectedIndex,
        onTap: (value) {
          setState(() {
            selectedIndex = value;
          });
        },
        selectedItemColor: Colors.indigo,
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.book), label: 'Books'),
          BottomNavigationBarItem(icon: Icon(Icons.movie), label: 'Movies'),
          BottomNavigationBarItem(icon: Icon(Icons.videogame_asset), label: 'Games'),
          BottomNavigationBarItem(icon: Icon(Icons.menu_book), label: 'Magazines'),
          BottomNavigationBarItem(icon: Icon(Icons.shopping_cart), label: 'Cart'),
        ],
      ),
    );
  }
}

class ProductPage extends StatefulWidget {
  final String endpoint;
  final String title;

  const ProductPage({
    super.key,
    required this.endpoint,
    required this.title,
  });

  @override
  State<ProductPage> createState() => _ProductPageState();
}

class _ProductPageState extends State<ProductPage> {
  late Future<List<dynamic>> itemsFuture;

  @override
  void initState() {
    super.initState();
    itemsFuture = fetchItems();
  }

  Future<List<dynamic>> fetchItems() async {
    final response = await http
        .get(Uri.parse('$baseUrl/${widget.endpoint}'))
        .timeout(const Duration(seconds: 60));

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }

    throw Exception('Failed: ${response.statusCode}');
  }

  void addToCart(Map<String, dynamic> item) {
    final existingIndex =
        Cart.items.indexWhere((cartItem) => cartItem['id'] == item['id']);

    if (existingIndex != -1) {
      Cart.items[existingIndex]['quantity']++;
    } else {
      Cart.items.add({
        ...item,
        'quantity': 1,
      });
    }

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Added to cart'),
        duration: Duration(seconds: 1),
      ),
    );
  }

  void showDetails(Map<String, dynamic> item) {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text(item['title'] ?? 'No Title'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('Price: \$${item['price']}'),
            Text('Copies: ${item['copies']}'),
            if (item['genre'] != null) Text('Genre: ${item['genre']}'),
            if (item['publisher'] != null) Text('Publisher: ${item['publisher']}'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Close'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('CloudShelf ${widget.title}'),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: itemsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          final items = snapshot.data ?? [];

          if (items.isEmpty) {
            return const Center(child: Text('No items found'));
          }

          return ListView.builder(
            itemCount: items.length,
            itemBuilder: (context, index) {
              final item = items[index];

              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                child: ListTile(
                  onTap: () => showDetails(item),
                  title: Text(item['title']?.toString() ?? 'No Title'),
                  subtitle: Text(
                    'Price: \$${item['price']}\nCopies: ${item['copies']}',
                  ),
                  trailing: IconButton(
                    icon: const Icon(Icons.add_shopping_cart),
                    onPressed: () => addToCart(item),
                  ),
                  isThreeLine: true,
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class CartPage extends StatefulWidget {
  const CartPage({super.key});

  @override
  State<CartPage> createState() => _CartPageState();
}

class _CartPageState extends State<CartPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Shopping Cart'),
      ),
      body: Cart.items.isEmpty
          ? const Center(child: Text('Cart is empty'))
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: Cart.items.length,
                    itemBuilder: (context, index) {
                      final item = Cart.items[index];

                      return Card(
                        margin: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 8),
                        child: ListTile(
                          title: Text(item['title']?.toString() ?? ''),
                          subtitle: Text(
                            'Price: \$${item['price']}\nQty: ${item['quantity']}',
                          ),
                          trailing: IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () {
                              setState(() {
                                if (item['quantity'] > 1) {
                                  item['quantity']--;
                                } else {
                                  Cart.items.removeAt(index);
                                }
                              });
                            },
                          ),
                          isThreeLine: true,
                        ),
                      );
                    },
                  ),
                ),
                Container(
                  padding: const EdgeInsets.all(20),
                  child: Text(
                    'Total: \$${Cart.totalPrice.toStringAsFixed(2)}',
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}