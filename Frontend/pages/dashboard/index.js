import React, { useEffect } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Statistics from "../../components/dashboard/Statistics";
import { useAppContext } from "../../src/context";
import router from "next/router";
import { parseCookies } from "nookies";

function index() {
  const { checkSession, loading, setLoading } = useAppContext();

  useEffect(() => {
    const cookies = parseCookies();
    if (
      Object.keys(cookies).length !== 0 &&
      cookies.constructor === Object &&
      cookies.token
    ) {
      checkSession();
    } else {
      router.push("/dashboard/signin");
    }
  }, []);

  if (loading) {
    return null;
  } else {
    return (
      <Dashboard>
        <Statistics />
      </Dashboard>
    );
  }
}

export default index;
