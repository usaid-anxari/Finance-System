import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Card/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransaction = ({transactions =[],onSeeMore}) => {
  return (
    <div className='card'>
         <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Expense</h5>
            <button className='card-btn' onClick={onSeeMore}>See All <LuArrowRight className='text-base'/></button>
         </div>
         <div className='mt-6'>
          {transactions.slice(0,5)?.map((expense)=>(
                <TransactionInfoCard key={expense._id} name={expense.name}  title={expense.category} quantity={expense.quantity} icon={expense.icon} date={moment(expense.date).format("DD MMM YYYY")} amount={expense.amount} type={"expense"} hideDeleteBtn />
            ))
          }
       </div>
    </div>
  )
}

export default ExpenseTransaction