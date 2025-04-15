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


const listTransactionType = new ListTransactionType(new TransactionTypeSupabaseRepository())

export const TransactionForm = () => {
    const [transactionTypes, setTransactionTypes] = useState<ITransactionType[]>([])
    const [transactionType, setTransactionType] = useState('')
    const [transactionValue, setSetTransactionValue] = useState('')

    useEffect(() => {
        listTransactionType.execute()
            .then(data => setTransactionTypes(data))
    }, [])

    const createTransacion = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault()
        console.log({
            transactionType,
            transactionValue
        })
    }

    return (
        <Card>
            <Wrapper>
                <Form onSubmit={createTransacion}>
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
                            onChange={evt => setSetTransactionValue(evt.target.value)}
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