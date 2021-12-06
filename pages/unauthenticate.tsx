import { useEffect } from "react";
import { useAuth } from "../contexts/auth";
import Loader from "../components/Loader";
import RequiresAuthentication from "../components/RequiresAuthentication";

function _Unauthenticate() {
  const { unauthenticate } = useAuth();

  useEffect(() => {
    unauthenticate();
  });

  return <Loader />;
}

export default function Unauthenticate() {
  return (
    <RequiresAuthentication>
      <_Unauthenticate />
    </RequiresAuthentication>
  );
}
