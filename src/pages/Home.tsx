import styled from "styled-components"
import { Sidebar } from "../presentation/Sidebar"
import { Account } from "../presentation/Account"
import { TransactionForm } from "../components/TransactionForm"
import { Statement } from "../presentation/Statement"
import { useState, useEffect } from "react";
import { ITransaction } from "../domain/entities/ITransaction";
import { ListAllTransactions } from "../domain/useCase/ListAllTransactions";
import { TransactionSupabaseRepository } from "../infra/supabase/TransactionSupabaseRepository";

const Main = styled.main`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 34px;
`

const Home = () => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const listAllTransactions = new ListAllTransactions(new TransactionSupabaseRepository());

    useEffect(() => {
        listAllTransactions.execute()
            .then(data => setTransactions(data))
    }, [])

    return (
        <Main>
            <Sidebar />
            <Account />
            <TransactionForm />
            <Statement allTransactions={transactions} />
        </Main>
    )
}

export default Home
