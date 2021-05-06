import React, { useEffect, useState } from "react";

// import { Container } from './styles';

export type User = { name: string; age: number };

const Home: React.FC = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const userData = await fetch(
        "https://mocki.io/v1/d63b928b-5a5c-415c-b9b5-1bc47714fd4e"
      );
      const user = (await userData.json()) as User;
      setUser(user);
    })();
  }, []);

  return (
    <div>
      <h1>{user?.name}</h1>
      <h1>{user?.age}</h1>
    </div>
  );
};

export default Home;
