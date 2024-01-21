import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  const result = await prisma.category.findMany({
    select: {
      id: true,
    },
  });

  try {
    await prisma.book.createMany({
      data: [
        {
          title: 'The Catcher in the Rye',
          description: 'A classic novel by J.D. Salinger.',
          image_url:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          release_year: 1951,
          price: '$10.99',
          total_page: 224,
          category_id: result[0].id,
          thickness: 'sedang',
        },
        {
          title: 'To Kill a Mockingbird',
          description:
            "Harper Lee's masterpiece about racial injustice in the American South.",
          image_url:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          release_year: 1960,
          price: '$12.99',
          total_page: 336,
          category_id: result[1].id,
          thickness: 'sedang',
        },
        {
          title: 'George Orwells',
          description:
            'George Orwells dystopian novel about a totalitarian society.',
          image_url:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          release_year: 1949,
          price: '$9.99',
          total_page: 328,
          category_id: result[2].id,
          thickness: 'sedang',
        },
        {
          title: 'The Great Gatsby',
          description:
            "F. Scott Fitzgerald's classic tale of the American Dream during the Jazz Age.",
          image_url:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          release_year: 1925,
          price: '$11.99',
          total_page: 180,
          category_id: result[0].id,
          thickness: 'sedang',
        },
        {
          title: "Harry Potter and the Sorcerer's Stone",
          description: "J.K. Rowling's first book in the magical series.",
          image_url:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          release_year: 1997,
          price: '$14.99',
          total_page: 320,
          category_id: result[1].id,
          thickness: 'sedang',
        },
        {
          title: 'The Hobbit',
          description: "J.R.R. Tolkien's fantasy adventure novel.",
          image_url:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          release_year: 1937,
          price: '$13.99',
          total_page: 310,
          category_id: result[2].id,
          thickness: 'sedang',
        },
        {
          title: 'The Da Vinci Code',
          description:
            "Dan Brown's mystery-thriller that captivated readers worldwide.",
          image_url:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          release_year: 2003,
          price: '$10.99',
          total_page: 454,
          category_id: result[0].id,
          thickness: 'sedang',
        },
        {
          title: 'The Hunger Games',
          description:
            "Suzanne Collins' dystopian novel set in a post-apocalyptic world.",
          image_url:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          release_year: 2008,
          price: '$11.99',
          total_page: 374,
          category_id: result[1].id,
          thickness: 'sedang',
        },
        {
          title: 'Sapiens: A Brief History of Humankind',
          description: "Yuval Noah Harari's exploration of human history.",
          image_url:
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          release_year: 2011,
          price: '$15.99',
          total_page: 443,
          category_id: result[2].id,
          thickness: 'sedang',
        },
      ],
    });

    console.log('Seeding book success');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export default seed;
