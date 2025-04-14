import { Link } from "react-router-dom"
import { Container, StyledHeader, List, ListItem } from "./styles"
import { useAuthContext } from "../../app/hooks/useAuthContex"
import { AutheticadedActionList } from "./AutheticadedActionList"
import { UnautheticadedActionList } from "./UnautheticadedActionList"
import { IconLogo } from "../../components/Icons"

export const Header = () => {
    const { session } = useAuthContext()
    return (<StyledHeader>
        <Container>
            <List>
                <ListItem>
                    <Link to="/">
                        <IconLogo />
                    </Link>
                </ListItem>
            </List>
            {session ? <AutheticadedActionList /> : <UnautheticadedActionList />}
        </Container>
    </StyledHeader>)
}