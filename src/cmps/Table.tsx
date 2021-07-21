import React from 'react'
import styled from 'styled-components'
import { Column, useTable, useSortBy } from 'react-table'
import { useState } from 'react'
import { Project } from '../store/project.js'
import { useEffect } from 'react'

interface Props {
    // columns: FormattedColumn[],
    columns: any[],
    data: any[]
}

interface globalProps {
    data: any
}

interface FormattedProj {
    col1?: string,
    col2?: number,
    col3?: number,
    col4?: number,
    col5?: boolean
}

interface FormattedColumn {
    header: string,
    accessor: string
}

const Styles = styled.div`
  padding: .3rem 1rem;

  table {
    width: 60vw;
    border-spacing: 0;
    border: 1px solid black;
    margin-bottom: 25px;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    
    th,
    td {
      vertical-align: middle;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`
const Table: React.FC<Props> = ({ columns, data }) => {

    const getScoreColor = (score: string | number) => {
        score = +score
        if (score < 70) return 'red'
        if (score > 90) return 'green'
    }

    const formatHeader = (header: any) => {
        let formatedHeader: String = ''
        const headerArr = header.split('')
        headerArr.forEach((letter: string, idx: number) => {
            if (idx === 0) letter = letter.toUpperCase()
            else if (letter === letter.toUpperCase()) {
                formatedHeader += ' '
                letter = letter.toLowerCase()
            }
            formatedHeader += letter
        })
        // console.log(formatedHeader);
        return formatedHeader
    }
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })
    // console.log('header groups', headerGroups);
    // console.log('rows', rows);

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            // <th {...column.getHeaderProps()}>{column.render('header')}</th>
                            <th {...column.getHeaderProps()}>{formatHeader(column.render('header'))}</th>

                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                if (cell.value?.substr(cell.value.length - 3, cell.value.length - 1) === 'jpg') {
                                    return <td {...cell.getCellProps()}> <img src={cell.value} style={{ borderRadius: '50%', width: '100px' }} alt="" /> </td>
                                }
                                if (cell.column.id === 'col 2') {
                                    return <td {...cell.getCellProps()} style={{ backgroundColor: getScoreColor(cell.value) }}>{cell.render('Cell')}</td>
                                }
                                if (cell.value === 'true') return <td {...cell.getCellProps()}>V</td>
                                if (cell.value === 'false') return <td {...cell.getCellProps()}>X</td>
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}


export const TableCmp: React.FC<globalProps> = ({ data }) => {

    const [columns, setcolumns] = useState<FormattedColumn[]>([])
    const [formattedData, setFormattedData] = useState<any>([])

    useEffect(() => {
        // console.log('mounted', data);
        getColumns()
        getFormattedData()

    }, [data])

    useEffect(() => {
        getFormattedData()
    }, [columns])

    const getColumns = () => {
        const columns = []
        let counter = 1
        const project = data[0]
        for (const key in project) {
            if (key !== 'id')
                columns.push({ header: key, accessor: `col ${counter++}` })
        }
        // console.log('cols', columns);
        setcolumns(columns)
    }


    const getFormattedData = () => {
        const formattedData: any[] = []

        data.forEach((project: any) => {
            let row: any = {}
            columns.forEach(column => {
                // console.log(column.accessor, column.header);

                row[column.accessor] = `${project[column.header]}`
            })
            formattedData.push(row)
        });

        // console.log('data', formattedData);
        setFormattedData(formattedData)
    }



    const dataToDisplay = React.useMemo(() => formattedData, [formattedData])
    const columnsToDisplay = React.useMemo(() => columns, [columns])

    // console.log(dataToDisplay, columnsToDisplay);
    if (!dataToDisplay.length || !columnsToDisplay.length) return <div>loading</div>
    return (
        <Styles>
            <Table columns={columnsToDisplay} data={formattedData} />
        </Styles>
    )
}


