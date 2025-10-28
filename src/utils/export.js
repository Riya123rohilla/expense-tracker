// PDF and Excel export utilities
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'

export const exportToPDF = (transactions, filters = {}) => {
  const doc = new jsPDF()
  
  // Title
  doc.setFontSize(20)
  doc.setTextColor(79, 70, 229) // Indigo
  doc.text('Expense Tracker Report', 14, 20)
  
  // Date and filters
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28)
  if (filters.month) {
    doc.text(`Period: ${filters.month}`, 14, 34)
  }
  
  // Summary
  const totals = transactions.reduce((acc, t) => {
    if (t.type === 'income') acc.income += t.amount
    else acc.expense += t.amount
    return acc
  }, { income: 0, expense: 0 })
  
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`Total Income: $${totals.income.toFixed(2)}`, 14, 44)
  doc.text(`Total Expense: $${totals.expense.toFixed(2)}`, 80, 44)
  doc.text(`Balance: $${(totals.income - totals.expense).toFixed(2)}`, 146, 44)
  
  // Table
  const tableData = transactions.map(t => [
    t.date,
    t.title,
    t.category,
    t.type === 'income' ? 'Income' : 'Expense',
    `$${t.amount.toFixed(2)}`
  ])
  
  doc.autoTable({
    startY: 52,
    head: [['Date', 'Title', 'Category', 'Type', 'Amount']],
    body: tableData,
    headStyles: { fillColor: [79, 70, 229] },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { left: 14, right: 14 }
  })
  
  // Footer
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150)
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    )
  }
  
  doc.save(`expense-report-${Date.now()}.pdf`)
}

export const exportToExcel = (transactions, filters = {}) => {
  // Prepare data
  const data = transactions.map(t => ({
    Date: t.date,
    Title: t.title,
    Category: t.category,
    Type: t.type === 'income' ? 'Income' : 'Expense',
    Amount: t.amount
  }))
  
  // Add summary at the end
  const totals = transactions.reduce((acc, t) => {
    if (t.type === 'income') acc.income += t.amount
    else acc.expense += t.amount
    return acc
  }, { income: 0, expense: 0 })
  
  data.push({})
  data.push({
    Date: 'SUMMARY',
    Title: '',
    Category: '',
    Type: '',
    Amount: ''
  })
  data.push({
    Date: 'Total Income',
    Title: '',
    Category: '',
    Type: '',
    Amount: totals.income
  })
  data.push({
    Date: 'Total Expense',
    Title: '',
    Category: '',
    Type: '',
    Amount: totals.expense
  })
  data.push({
    Date: 'Balance',
    Title: '',
    Category: '',
    Type: '',
    Amount: totals.income - totals.expense
  })
  
  // Create workbook and worksheet
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Transactions')
  
  // Set column widths
  ws['!cols'] = [
    { wch: 12 }, // Date
    { wch: 25 }, // Title
    { wch: 15 }, // Category
    { wch: 10 }, // Type
    { wch: 12 }  // Amount
  ]
  
  // Save file
  XLSX.writeFile(wb, `expense-report-${Date.now()}.xlsx`)
}
