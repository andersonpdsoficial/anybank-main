import { toast } from "react-toastify";
import { useAuthContext } from "../../app/hooks/useAuthContex";
import { IconAvatar } from "../Icons";
import { ListItem } from "../Sidebar/styles";
import { TransparentButton } from "../TransparentButton";
import { List } from "./styles";
import { useNavigate } from "react-router";


export const AutheticadedActionList = () => {

    const { logout } = useAuthContext()
    const navigate = useNavigate()
    const onAskForLogout = async () => {
        console.log('logout')
        try {
            await logout()
            toast.success('Deslogado com sucesso')
            navigate('/auth/login')
        } catch (error) {
            console.error('Error logging out:', error)
            toast.error('Erro ao deslogar')
        }
    }

    return (
        <List>
            <ListItem>
                BOas Vindas
            </ListItem>
            <ListItem>
                <IconAvatar />
            </ListItem>
            <ListItem>
                <TransparentButton onClick={onAskForLogout}>
                    Logout
                </TransparentButton>
            </ListItem>
        </List>
    )
}   
