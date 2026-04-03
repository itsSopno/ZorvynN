let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@zorvyn.com', role: 'admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@zorvyn.com', role: 'user' },
  { id: 3, name: 'Carol White', email: 'carol@zorvyn.com', role: 'user' },
];

// GET /api/users/[id]
export async function GET(request, { params }) {
  const user = users.find(u => u.id === parseInt(params.id));
  if (!user) {
    return Response.json({ success: false, error: 'User not found' }, { status: 404 });
  }
  return Response.json({ success: true, data: user });
}

// PUT /api/users/[id]
export async function PUT(request, { params }) {
  const index = users.findIndex(u => u.id === parseInt(params.id));
  if (index === -1) {
    return Response.json({ success: false, error: 'User not found' }, { status: 404 });
  }
  const body = await request.json();
  users[index] = { ...users[index], ...body };
  return Response.json({ success: true, data: users[index], message: 'User updated' });
}

// DELETE /api/users/[id]
export async function DELETE(request, { params }) {
  const index = users.findIndex(u => u.id === parseInt(params.id));
  if (index === -1) {
    return Response.json({ success: false, error: 'User not found' }, { status: 404 });
  }
  users.splice(index, 1);
  return Response.json({ success: true, message: 'User deleted successfully' });
}
