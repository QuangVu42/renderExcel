import React, { useState } from "react";
import { dataExcel } from "./dataMock";
import { exportLabelExcel } from "./exportLabelExcel";
import { exportExcelSpecialThree } from "./exportExcelSpecialThree";
interface FormData {
    name: string;
    number: string;
    type: string;
    img: string;
    description: string;
}

const MyForm: React.FC = () => {
    const [form, setForm] = useState<FormData>({ name: "", number: "", type: "", img: '', description: '' });

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === "type") {
            const selected = dataExcel.find(item => String(item.id) === value);
            setForm({
                ...form,
                type: value,
                img: selected?.img || "",
                description: selected?.description || ""
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { type, number, name } = form;
        console.log('type?.toString()', type?.toString() === '1')
        if (type?.toString() === '1') {
            exportLabelExcel({
                text: name,
                quantity: Number(number),
                colWidthMM: 17,
                rowHeightMM: 12,
                col: 5
            })
        } else if (type?.toString() === '2') {
            exportLabelExcel({
                text: name,
                quantity: Number(number),
                colWidthMM: 32,
                rowHeightMM: 18,
                col: 2
            })

        } else if (type?.toString() === '3') {
            exportExcelSpecialThree({
                rowTexts: ["For BL-5J", "Iphone 8P", "2691mAh"],  
                colWidthMM: 28,   
                rowHeightMM: 10,  
                fileName: "labels.xlsx"
            });
        }
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
                    maxWidth: 700,
                    width: "100%",
                    minWidth: 300,
                }}
            >
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '400px' }}>
                        <div style={{ marginBottom: 10 }}>
                            <select
                                name="type"
                                value={form.type}
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
                        <div style={{ paddingBottom: '10px' }}>
                            <i>{form?.description}</i>
                        </div>
                        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
                            <label style={{
                                display: "block",
                                fontWeight: 600,
                                color: "#3f51b5",
                                marginBottom: 6,
                                textAlign: 'left'
                            }}>
                                Số lượng tem cần in :
                            </label>
                            <input
                                type="number"
                                name="number"
                                step={1}
                                value={form.number}
                                onChange={handleChange}
                                style={{
                                    width: "300px",
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
                                textAlign: 'left'
                            }}>
                                Tên sản phầm <i>(Trong một ô)</i>
                            </label>
                            <textarea
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
                                    resize: "vertical",
                                    minHeight: "60px",
                                    maxHeight: "200px"
                                }}
                                required
                                onFocus={e => { if (e.currentTarget) e.currentTarget.style.borderColor = "#536dfe" }}
                                onBlur={e => { if (e.currentTarget) e.currentTarget.style.borderColor = "#c5cae9" }}
                                rows={3}
                            />

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
                    </div>
                    <div style={{ width: '200px', marginLeft: '20px' }}>
                        <span style={{
                            textAlign: "center",
                            fontWeight: 700,
                            color: "#1a237e",
                            letterSpacing: 1,
                            marginBottom: '20px'
                        }}>
                            Mẫu file xuất
                        </span>
                        <img
                            style={{
                                height: '300px',
                                width: '300px',
                                objectFit: 'contain'
                            }}
                            src={form?.img}
                            alt=""
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MyForm;
