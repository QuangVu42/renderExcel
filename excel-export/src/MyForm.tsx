import React, { useState } from "react";
import { dataExcel } from "./dataMock";

interface FormData {
    name: string;
    email: string;
    gender: string;
}

const MyForm: React.FC = () => {
    const [form, setForm] = useState<FormData>({ name: "", email: "", gender: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dữ liệu nhập:", form);
        alert(`Gửi thành công!\nTên: ${form.name}\nEmail: ${form.email}\nGiới tính: ${form.gender}`);
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #ece9e6, #ffffff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
                    padding: "32px 32px 24px 32px",
                    maxWidth: 400,
                    width: "100%",
                    minWidth: 300,
                }}
            >
                <h2 style={{
                    textAlign: "center",
                    fontWeight: 700,
                    marginBottom: 24,
                    color: "#1a237e",
                    letterSpacing: 1,
                }}>
                    Thông tin cơ bản
                </h2>
                <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                    <label style={{
                        display: "block",
                        fontWeight: 600,
                        color: "#3f51b5",
                        marginBottom: 6,
                    }}>
                        Tên sản phầm <i>(Trong một ô)</i>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px 14px",
                            border: "1.5px solid #c5cae9",
                            borderRadius: 8,
                            fontSize: 16,
                            outline: "none",
                            transition: "border-color 0.2s",
                            boxSizing: "border-box",
                        }}
                        required
                        onFocus={e => e.currentTarget.style.borderColor = "#536dfe"}
                        onBlur={e => e.currentTarget.style.borderColor = "#c5cae9"}
                    />
                </div>
                <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                    <label style={{
                        display: "block",
                        fontWeight: 600,
                        color: "#3f51b5",
                        marginBottom: 6,
                    }}>
                        Số lượng tem cần in :
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        style={{
                            width: "600px",
                            padding: "10px 14px",
                            border: "1.5px solid #c5cae9",
                            borderRadius: 8,
                            fontSize: 16,
                            outline: "none",
                            transition: "border-color 0.2s",
                            boxSizing: "border-box",
                        }}
                        required
                        onFocus={e => e.currentTarget.style.borderColor = "#536dfe"}
                        onBlur={e => e.currentTarget.style.borderColor = "#c5cae9"}
                    />
                </div>
                <div style={{ marginBottom: 24 }}>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                            padding: "10px 14px",
                            border: "1.5px solid #c5cae9",
                            borderRadius: 8,
                            fontSize: 16,
                            outline: "none",
                            transition: "border-color 0.2s",
                            boxSizing: "border-box",
                            background: "#f7f9fa"
                        }}
                        required
                        onFocus={e => (e.currentTarget.style.borderColor = "#536dfe")}
                        onBlur={e => (e.currentTarget.style.borderColor = "#c5cae9")}
                    >
                        <option value="" disabled>
                            -- Chọn kiểu xuất --
                        </option>
                        {dataExcel?.map(item => (
                            <option value={item?.id}>{item?.name}</option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        background: "linear-gradient(90deg, #5c6bc0, #1e88e5)",
                        color: "#fff",
                        padding: "12px 0",
                        borderRadius: 8,
                        border: "none",
                        fontWeight: 700,
                        fontSize: 16,
                        letterSpacing: 1,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(33,150,243,0.08)",
                        transition: "background 0.2s"
                    }}
                >
                    Xuất file
                </button>
            </form>
        </div>
    );
};

export default MyForm;
