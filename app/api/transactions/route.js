import connectToDatabase from '../../../lib/db';
import Transaction from '../../../lib/models/Transaction';

// GET /api/transactions
export async function GET() {
  try {
    await connectToDatabase();
    // Fetch all transactions, sorted by date (newest first)
    const transactions = await Transaction.find({}).sort({ date: -1 });
    return Response.json({ success: true, data: transactions, total: transactions.length });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

/**
 * @NAME postTransactions
 * @desc specially for Zorvyn
 * @route POST /api/transactions
 * @access public
 */
export async function POST(request) {
  try {
    await connectToDatabase();

    const { title, amount, type, category, date, note } = await request.json();

    const newTransaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,
      note
    });

    return Response.json({ success: true, data: newTransaction, message: 'Transaction created successfully' }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}
