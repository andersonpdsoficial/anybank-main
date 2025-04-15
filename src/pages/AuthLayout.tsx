import { Outlet, useNavigate } from "react-router";
import { Card as BaseCard } from "../components/Card";
import styled from "styled-components";
import { useEffect } from "react";
import { useAuthContext } from "../app/hooks/useAuthContex";

const Card = styled(BaseCard)`
  display: flex;
  gap: 16px;
  margin: 24px auto;
`;

const AuthLayout = () => {
    const { session } = useAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (session) {
            navigate('/')
        }
    }, [session, navigate])

    return (
        <Card>
            <Outlet />
        </Card>
    )
}

export default AuthLayout
