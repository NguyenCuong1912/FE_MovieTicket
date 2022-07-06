import React, { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { quanLyTicketServices } from './../../../services/QuanLyTicketServices';
export default function Home() {
    const [state, setState] = useState([]);
    console.log(state)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        try {
            const result = await quanLyTicketServices.toTal();
            if (result.status === 200) {
                let arr = []
                result.data.forEach(element => {
                    arr = [...arr, element.total]
                });
                await setState(arr)
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className='px-20'>
            <h3 className='text-center text-3xl'>Doanh Thu Theo Tháng Của Web</h3>
            <Bar
                data={{
                    labels: [
                        "Tháng 1",
                        "Tháng 2",
                        "Tháng 3",
                        "Tháng 4",
                        "Tháng 5",
                        "Tháng 6",
                        "Tháng 7",
                        "Tháng 8",
                        "Tháng 9",
                        "Tháng 10",
                        "Tháng 11",
                        "Tháng 12"
                    ],
                    datasets: [
                        {
                            label: "Số tiền kiếm được (VND)",
                            backgroundColor: [
                                "#3e95cd",
                                "#8e5ea2",
                                "#3cba9f",
                                "#e8c3b9",
                                "#c45850",
                                "#ffee58",
                                "#f4511e",
                                "#78909c",
                                "#00e676",
                                "#880e4f",
                                "#006064",
                                "#f50057"
                            ],
                            data: state
                        }
                    ]
                }}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: "Số tiền kiếm được"
                    }
                }}
            />
        </div>
    )
}
