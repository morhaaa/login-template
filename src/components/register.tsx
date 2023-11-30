"use client";
import axios from "axios";
import { useRef, useState, useEffect } from "react";
import toast from "react-hot-toast";

const Register: React.FC = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const pswRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

  const userMailRef = useRef<HTMLInputElement>(null);
  const pswRef = useRef<HTMLInputElement>(null);
  const confirmPswRef = useRef<HTMLInputElement>(null);

  const [userMail, setUserMail] = useState("");
  const [isValidMail, setIsValidMail] = useState<boolean>(false);
  const [errMail, setErrMail] = useState<string | null>();
  const [userMailFocus, setUserMailFocus] = useState<boolean>(false);

  const [psw, setPsw] = useState("");
  const [isValidPsw, setIsValidPsw] = useState<boolean>(false);
  const [errPsw, setErrPsw] = useState<string | null>();
  const [pswFocus, setPswFocus] = useState<boolean>(false);

  const [confirmPsw, setConfirmPsw] = useState("");
  const [isValidConfirmPsw, setIsValidConfirmPsw] = useState<boolean>(false);
  const [errConfirmPsw, setErrConfirmPsw] = useState<string | null>();
  const [confirmPswFocus, setConfirmPswFocus] = useState<boolean>(false);

  useEffect(() => {
    if (userMailRef.current) {
      userMailRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const isValidMail = emailRegex.test(userMail);
    setIsValidMail(isValidMail);
  }, [userMail]);

  useEffect(() => {
    const isValidPsw = pswRegex.test(psw);
    setIsValidPsw(isValidPsw);
  }, [psw]);

  useEffect(() => {
    const isValidConfirmPsw = pswRegex.test(confirmPsw);
    setIsValidConfirmPsw(isValidConfirmPsw);
  }, [confirmPsw]);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setUserMail(value);
  };

  const handlePswInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPsw(value);
  };

  const handleConfirmPswInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    setConfirmPsw(value);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    setErrMail(isValidMail ? null : "Invalid email");
    setErrPsw(isValidPsw ? null : "Invalid password");
    setErrConfirmPsw(
      isValidConfirmPsw ? null : "Invalid confirmation password"
    );

    if (isValidMail && isValidPsw && isValidConfirmPsw) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API}/register`,
          JSON.stringify({ mail: userMail, password: psw }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
      } catch (e) {
        toast.error("error");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-96"
    >
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          onChange={(e) => handleEmailInput(e)}
          required
          onFocus={() => setUserMailFocus(true)}
          onBlur={() => setUserMailFocus(false)}
          ref={userMailRef}
          className={`w-full px-3 py-2 border ${
            userMailFocus ? "border-blue-500" : "border-gray-300"
          } rounded focus:outline-none focus:shadow-outline-blue`}
        />
        <p className="h-3">
          {errMail && (
            <span className="text-red-500 text-sm mt-1">{errMail}</span>
          )}
        </p>
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-600"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => handlePswInput(e)}
          required
          onFocus={() => setPswFocus(true)}
          onBlur={() => setPswFocus(false)}
          ref={pswRef}
          className={`w-full px-3 py-2 border ${
            pswFocus ? "border-blue-500" : "border-gray-300"
          } rounded focus:outline-none focus:shadow-outline-blue`}
        />
        <p className="h-3">
          {errPsw && (
            <span className="text-red-500 text-sm mt-1">{errPsw}</span>
          )}
        </p>
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-600"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          autoComplete="off"
          onChange={(e) => handleConfirmPswInput(e)}
          required
          onFocus={() => setConfirmPswFocus(true)}
          onBlur={() => setConfirmPswFocus(false)}
          ref={confirmPswRef}
          className={`w-full px-3 py-2 border ${
            confirmPswFocus ? "border-blue-500" : "border-gray-300"
          } rounded focus:outline-none focus:shadow-outline-blue`}
        />
        <p className="h-3">
          {errConfirmPsw && (
            <span className="text-red-500 text-sm mt-1">{errConfirmPsw}</span>
          )}
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default Register;
