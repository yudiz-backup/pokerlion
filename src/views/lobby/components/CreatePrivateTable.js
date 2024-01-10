/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import { Button, FormGroup, Input } from 'reactstrap'
import { connect, useDispatch, useSelector } from 'react-redux'
import { createPrivateTable } from '../../../actions/lobby';
import Loading from '../../../components/Loading';
import { getProfile } from '../../../actions/account';

function CreateTable(props) {
    const [pointValue, setPointValue] = useState(0);
    const [players, setPlayers] = useState(0);
    const [tableFee, setTableFee] = useState(0);
    const [privateTableRange, setPrivateTableRange] = useState([]);
    const [loading, setLoading] = useState(false);

    const playerTab = props?.playerTab
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const gameSettings = useSelector(state => state.account.data)
    const createPrivateTableStatus = useSelector(state => state.lobby.createPrivateTableResStatus)
    // const createPrivateTableData = useSelector(state => state.lobby.createPrivateTableData)
    const previousProps = useRef({ createPrivateTableStatus }).current

    useEffect(() => {
        if (playerTab === '5') {
            setPlayers(2)
        } else {
            setPlayers(6)
        }
    }, [playerTab])

    useEffect(() => {
        if (gameSettings) {
            setPrivateTableRange(gameSettings?.aPrivateTableRange)
            setPointValue(gameSettings?.aPrivateTableRange[0])
        }
    }, [gameSettings])

    useEffect(() => {
        if (pointValue) {
            setTableFee(pointValue * 240)
        }
    }, [pointValue])

    useEffect(() => {
        if (previousProps.createPrivateTableStatus !== createPrivateTableStatus) {
            if (createPrivateTableStatus === true) {
                setLoading(false)
            }
            if (createPrivateTableStatus === false) {
                setLoading(false)
            }
        }
        return () => {
            previousProps.createPrivateTableStatus = createPrivateTableStatus
        }
    }, [createPrivateTableStatus])


    function handleSlider(e) {
        const rangeArray = gameSettings?.aPrivateTableRange
        switch (e.target.value) {
            case "0":
                setPointValue(rangeArray[0])
                break;
            case "1":
                setPointValue(rangeArray[1])
                break;
            case "2":
                setPointValue(rangeArray[2])
                break;
            case "3":
                setPointValue(rangeArray[3])
                break;
            case "4":
                setPointValue(rangeArray[4])
                break;
            case "5":
                setPointValue(rangeArray[5])
                break;
            default:
                break;
        }
    }


    function handleCreateTable() {
        setLoading(true)
        dispatch(createPrivateTable('point', tableFee, players, pointValue, token))
    }


    return (
        <div className='create-table text-center'>
            {loading && <Loading />}
            <div className='point-fees d-flex justify-content-center'>
                <div>
                    <p>Point Value</p>
                    <span>{pointValue}</span>
                </div>
                <div>
                    <p>Entry Fee</p>
                    <span>&#8377; {pointValue * 240}</span>
                </div>
            </div>
            <div className='range'>
                <FormGroup>
                    <Input type="range" onChange={handleSlider} name="range" min="0" max="5" defaultValue="0" step="1" id="exampleRange" />
                </FormGroup>
                <div className='range-numbers d-flex justify-content-between'>
                    {privateTableRange?.map((range, i) => (
                        <span key={i}>{range}</span>
                    ))}
                    {/* <span>0.1</span>*/}
                </div>
            </div>
            <Button type="button" onClick={handleCreateTable} className='common-btn yellow-btn small-btn'>Create</Button>
        </div>
    )
}

export default connect()(CreateTable)
