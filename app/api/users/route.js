import connectToDatabase from '../../../lib/db';
import User from '../../../lib/models/User';

// GET /api/users
export async function GET() {
  try {
    await connectToDatabase();
    const users = await User.find({});
    return Response.json({ success: true, data: users, total: users.length });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST /api/users
export async function POST(request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { name, email, role = 'user' } = body;

    if (!name || !email) {
      return Response.json(
        { success: false, error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const newUser = await User.create({ name, email, role });

    return Response.json(
      { success: true, data: newUser, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}
