import { useState } from "react";
import toast from "react-hot-toast";
import { makeAuth, makeRegister } from "./actions";
import { useLocation } from "wouter";
import { setUserStore } from "@/store/user";
import "./page.style.scss";

const init = {
	username: "",
	password: "",
	confirm_password: "",
	action: "login",
};

export const LoginPage = () => {
	// eslint-disable-next-line
	const [_, navigate] = useLocation();
	const [form, setForm] = useState(init);

	const _login = () => {
		if (!form.username || !form.password) {
			toast.error("Por favor, rellena todos los campos");
			return;
		}

		const _t = toast.loading("Iniciando session...");

		makeAuth(btoa(`${form.username}:${form.password}`)).then(
			({ detail, result }) => {
				if (detail) {
					toast.error(detail, { id: _t });
					return;
				}

				setUserStore(result);
				toast.dismiss(_t);
				navigate("/");
			}
		);
	};

	const _register = () => {
		if (!form.username || !form.password || !form.confirm_password) {
			toast.error("Por favor, rellena todos los campos");
			return;
		}

		if (form.password !== form.confirm_password) {
			toast.error("Las contraseñas no coinciden");
			return;
		}

		const _t = toast.loading("Registrando...");

		makeRegister(form).then(({ detail, result }) => {
			if (detail) {
				toast.error(detail, { id: _t });
				return;
			}

			setUserStore(result);
			toast.dismiss(_t);
			setForm(init);
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (form.action === "login") {
			_login();
		} else {
			_register();
		}
	};

	return (
		<section className="login-page">
			<form
				className="login-form flex column gap"
				onSubmit={handleSubmit}>
				<label className="flex column justify-start">
					Email
					<input
						value={form.username}
						onChange={e =>
							setForm(prev => ({
								...prev,
								username: e.target.value,
							}))
						}
						required
					/>
				</label>
				<label className="flex column justify-start">
					Password
					<input
						type="password"
						value={form.password}
						onChange={e =>
							setForm(prev => ({
								...prev,
								password: e.target.value,
							}))
						}
						required
					/>
				</label>

				{form.action === "register" && (
					<label className="flex column justify-start">
						Confirmar Password
						<input
							type="password"
							value={form.confirm_password}
							onChange={e =>
								setForm(prev => ({
									...prev,
									confirm_password: e.target.value,
								}))
							}
							required
						/>
					</label>
				)}
				<button>
					{form.action === "login" ? "Iniciar Sesión" : "Registrarse"}
				</button>
				<small
					role="button"
					onClick={() => {
						setForm(prev => ({
							username: "",
							password: "",
							confirm_password: "",
							action:
								prev.action === "login" ? "register" : "login",
						}));
					}}
					style={{
						textAlign: "right",
						color: "#fffb50",
					}}>
					{form.action === "login" ? "Registrarse" : "Iniciar Sesión"}
				</small>
			</form>
		</section>
	);
};
