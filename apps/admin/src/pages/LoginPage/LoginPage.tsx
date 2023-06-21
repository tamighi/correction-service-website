import React from "react";

import { ICredentials } from "services/auth";
import { useAuth } from "hooks/useAuth";
import { Button, Card, Input, useForm } from "lib";

import styles from "./LoginPage.css";

const LoginPage = () => {
  const { handleSubmit, register, reset } = useForm<ICredentials>();
  const { login } = useAuth();
  const [error, setError] = React.useState(false);

  const onSubmit = async (credentials: Partial<ICredentials>) => {
    try {
      await login(credentials as ICredentials);
    } catch {
      setError(true);
      reset();
    }
  };

  return (
    <div className={styles.LoginPage}>
      <Card>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("username")} placeholder="Identifiant" />
          <Input
            {...register("password")}
            placeholder="Mot de passe"
          />
          {error && <p>Identifiant ou mot de passe incorrect</p>}
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
