import connectToDatabase from '../../../../lib/db';
import Transaction from '../../../../lib/models/Transaction';

/**
 * @name EditRoute
 * @desc for put method
 * @route PUT /api/transactions/:id
 * @access public
 */
export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const body = await request.json();

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return Response.json({ success: false, message: 'Transaction not found' }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: updatedTransaction,
      message: 'Transaction updated successfully'
    });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}

/**
 * @name DeleteRoutes
 * @desc for delete method
 * @route DELETE /api/transactions/:id
 * @access public
 */
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = params;
    const deletedTransaction = await Transaction.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return Response.json({ success: false, message: "Transaction not found" }, { status: 404 });
    }
    return Response.json({ success: true, data: deletedTransaction, message: "Transaction deleted successfully" });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 400 });
  }
}
