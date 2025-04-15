import { useEffect, useState } from "react"
import { Form, Heading, Wrapper } from "./styles"
import { Button } from "../Button"
import { Card } from "../Card"
import { TextField } from "../TextField"
import { FormLabel } from "../FormLabel"
import { Dropdown } from "../Dropdown"
import { TransactionTypeSupabaseRepository } from "../../infra/supabase/transactionTypeSupabaseRepository"
import { ListTransactionType } from "../../domain/useCase/ListTransactionType"
import { ITransactionType } from "../../domain/entities/ITransactionType"
import { CreateTransaction } from "../../domain/useCase/CreateTransaction"
import { TransactionSupabaseRepository } from "../../infra/supabase/TransactionSupabaseRepository"      
import { useAuthContext } from "../../app/hooks/useAuthContex"
import { toast } from "react-toastify"

const listTransactionTypes = new ListTransactionType(new TransactionTypeSupabaseRepository())
const createTransaction = new CreateTransaction(new TransactionSupabaseRepository())

export const TransactionForm = () => {
    const [transactionTypes, setTransactionTypes] = useState<ITransactionType[]>([])
    const { session } = useAuthContext()
    const [transactionType, setTransactionType] = useState('')
    const [transactionValue, setTransactionValue] = useState('')

    useEffect(() => {
        listTransactionTypes.execute()
            .then(data => setTransactionTypes(data))
    }, [])

    const handleFormSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        console.log({
            transactionType,
            transactionValue
        })
        if (session) {
            try {
                await createTransaction.execute(parseFloat(transactionValue), parseInt(transactionType), session.user.id)
                setTransactionValue('')
                setTransactionType('')
                toast.success('Transação criada com sucesso')
            } catch (error) {
                console.log('falha ao cadastrar transação', error)
                toast.error('Erro ao criar transação')
            }
        }
    }

    return (
        <Card>
            <Wrapper>
                <Form onSubmit={handleFormSubmit}>
                    <Heading>
                        Nova transação
                    </Heading>
                    <fieldset>
                        <FormLabel>
                            Transação
                        </FormLabel>
                        <Dropdown
                            value={transactionType}
                            onChange={evt => setTransactionType(evt.target.value)}
                            required
                        >
                            <option value="" disabled hidden>
                                Selecione o tipo de transação
                            </option>
                            {transactionTypes.map(t => <option value={t.id} key={t.id}>{t.display}</option>
                            )}
                        </Dropdown>
                    </fieldset>
                    <fieldset>
                        <FormLabel>
                            Valor
                        </FormLabel>
                        <TextField
                            placeholder="R$ 00,00"
                            type="number"
                            value={transactionValue}
                            onChange={evt => setTransactionValue(evt.target.value)}
                            required
                        />
                    </fieldset>
                    <Button>
                        Concluir transação
                    </Button>
                </Form>
            </Wrapper>
        </Card>
    )
}