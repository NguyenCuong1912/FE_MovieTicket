import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { VerticalAlignBottomOutlined } from '@ant-design/icons'

export default function Export_Excel(props) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    return (
        <button onClick={(e) => {
            exportToCSV(props.csvData, props.fileName)
        }} className='text-white bg-yellow-400 flex items-center justify-center px-3 py-2'><VerticalAlignBottomOutlined style={{ marginRight: '10px' }} />Xuất File Excel</button>
    )
}
