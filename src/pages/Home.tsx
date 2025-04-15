import styled from "styled-components"
import { Sidebar } from "../presentation/Sidebar"
import { Account } from "../presentation/Account"
import { TransactionForm } from "../components/TransactionForm"
import { Statement } from "../presentation/Statement"
import { useState, useEffect     } from "react";
import { ITransaction } from "../domain/entities/ITransaction";
import { ListAllTransactions } from "../domain/useCase/ListAllTransactions";
import { TransactionSupabaseRepository } from "../infra/supabase/TransactionSupabaseRepository";

const Main = styled.main`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 34px;
`

const transactions = [
  {
    id: 1,
    value: 150,
    type: 'Depósito',
    date: new Date(2022, 9, 18)
  },
  {
    id: 2,
    value: 200,
    type: 'Saque',
    date: new Date(2022, 8, 19)
  },
  {
    id: 3,
    value: 300,
    type: 'Transferência',
    date: new Date(2022, 8, 20)
  },
  {
    id: 4,
    value: 500,
    type: 'Depósito',
    date: new Date(2022, 7, 21)
  }
];

const listTransactions = new ListAllTransactions(new TransactionSupabaseRepository())

const Home = () => {

  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() => {
    listTransactions.execute()
        .then(data => setTransactions(data))
}, [])

  return (
    <>
      <Sidebar />
      <Main>
        <Account />
        <TransactionForm />
      </Main>
      <div>
        <Statement allTransactions={transactions} />
      </div>
    </>
  )
}

export default Home
