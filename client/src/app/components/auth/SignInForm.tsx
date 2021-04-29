import React, { useEffect, useRef } from "react";
import { useForm } from "../other/hooks/useForm";
import { useSelector } from "react-redux";
import { clearAuthSuccess, signIn } from "../../../features/user/userSlice";
import { RootState } from "../../store";
import toast from "react-hot-toast";
import { useDispatchWithReturn } from "../other/hooks/useDispatchWithReturn";

export const SignInForm = () => {
  const [values, handleChange] = useForm({
    email: "",
    password: "",
  });
  const { success } = useSelector((state: RootState) => state.user);
  const form = useRef<HTMLFormElement>(null);
  const [dispatch] = useDispatchWithReturn();

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearAuthSuccess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.current?.classList.add("was-validated");
    if (form.current?.checkValidity()) {
      try {
        await dispatch(signIn(values));
      } catch (e) {
        toast.error(e.message);
      }
    } else {
    }
  };

  return (
    <form
      className="p-3 form needs-validation border rounded-3"
      onSubmit={onSubmit}
      ref={form}
      noValidate
    >
      <h2 className="text-center h3 mb-4 fw-normal">Sign in</h2>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          className="form-control p-2 mb-2"
          id="email"
          type="email"
          placeholder="E-mail"
          onChange={handleChange}
          value={values.email}
          required
          autoFocus
        />
        <div className="invalid-feedback">Valid e-mail is required</div>
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          className="form-control p-2 mb-2"
          id="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={values.password}
          required
        />
        <div className="invalid-feedback">Password is required</div>
      </div>
      <button className="w-100 mt-3 btn btn-md btn-primary" type="submit">
        Sign in
      </button>
      <div className="text-end">
        <a href="/signup" className="text-end text-muted">
          Sign up
        </a>
      </div>
    </form>
  );
};
