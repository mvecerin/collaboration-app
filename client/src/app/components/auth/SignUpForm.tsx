import React, { useRef } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signUp } from "../../../features/user/userSlice";
import { RootState } from "../../store";
import { useDispatchWithReturn } from "../other/hooks/useDispatchWithReturn";
import { useForm } from "../other/hooks/useForm";

export const SignUpForm = () => {
  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { success } = useSelector((state: RootState) => state.user);
  const [dispatch] = useDispatchWithReturn();
  const form = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.current?.classList.add("was-validated");
    if (form.current?.checkValidity()) {
      try {
        await dispatch(signUp(values));
      } catch (e) {
        toast.error(e.message);
      }
    }
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (values.password !== e.target.value) {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.replace("is-invalid", "is-valid");
    }
  };

  return success ? (
    <Redirect to="/signin" />
  ) : (
    <form
      className="p-3 form border rounded-3"
      onSubmit={onSubmit}
      ref={form}
      noValidate
    >
      <h2 className="text-center h3 mb-4 fw-normal">Sign up</h2>

      <div>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          className="form-control p-2 mb-2"
          id="name"
          placeholder="Name"
          onChange={handleChange}
          value={values.name}
          required
          autoFocus
        />
        <div className="invalid-feedback">Name is required</div>
      </div>

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
          minLength={8}
          onChange={handleChange}
          value={values.password}
          required
        />
        <div className="invalid-feedback">
          Password must have at least 8 characters.
        </div>
      </div>

      <div>
        <label htmlFor="password2">Repeat password</label>
        <input
          name="password2"
          className="form-control p-2 mb-2"
          id="password2"
          type="password"
          minLength={8}
          placeholder="Repeat password"
          onChange={onPasswordChange}
          value={values.password2}
          required
        />
        <div className="invalid-feedback">Passwords do not match.</div>
      </div>

      <button className="w-100 mt-3 btn btn-md btn-primary" type="submit">
        Sign up
      </button>
      <p className="text-end">
        <a href="/signin" className="text-muted">
          Sign in
        </a>
      </p>
    </form>
  );
};
