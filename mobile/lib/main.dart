import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

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
      home: const BooksPage(),
    );
  }
}

class BooksPage extends StatefulWidget {
  const BooksPage({super.key});

  @override
  State<BooksPage> createState() => _BooksPageState();
}

class _BooksPageState extends State<BooksPage> {
  late Future<List<dynamic>> booksFuture;

  @override
  void initState() {
    super.initState();
    booksFuture = fetchBooks();
  }

  Future<List<dynamic>> fetchBooks() async {
    final response = await http.get(
      Uri.parse(
        'https://csd230-lecture-2-11-1-react-in-class-dee5.onrender.com/api/books',
      ),
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed: ${response.statusCode}');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('CloudShelf Books'),
      ),
      body: FutureBuilder<List<dynamic>>(
        future: booksFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          final books = snapshot.data ?? [];

          if (books.isEmpty) {
            return const Center(child: Text('No books found'));
          }

          return ListView.builder(
            itemCount: books.length,
            itemBuilder: (context, index) {
              final book = books[index];

              return ListTile(
                title: Text(book['title'] ?? ''),
                subtitle: Text(
                  'Author: ${book['author'] ?? ''}\nPrice: \$${book['price']}',
                ),
              );
            },
          );
        },
      ),
    );
  }
}