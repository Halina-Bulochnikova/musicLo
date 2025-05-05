import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken } from "../../servis/clientQr";

const clientId = "86605a51d31243bf89bbdf9d1cedcd7c";

const CallbackPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");
    if (!code) {
      navigate("/dashboard");
      return;
    }

    getAccessToken(clientId, code)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Auth callback error:", err);
      });
  }, [params, navigate]);

  return <div>Повернення з авторизації...</div>;
};

export default CallbackPage;
