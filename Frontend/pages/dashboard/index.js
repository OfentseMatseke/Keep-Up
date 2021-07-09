import React, { useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Statistics from "../../components/dashboard/Statistics";
import { useAppContext } from "../../src/context";

function index() {
  const { user, authenticated, checkSession, setUser } = useAppContext();

  useEffect(() => {
    checkSession();
    // if (!authenticated) console.log(checkSession());
    console.log("This is the user ", authenticated);
  }, []);
  return (
    <Dashboard>
      <Statistics />
    </Dashboard>
  );
}

export default index;
