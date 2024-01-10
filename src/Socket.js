
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'
import { ToastContainer, toast } from 'react-toastify';
import config from './config'
import { unAuthorized } from './helper'

function Socket() {

    const token = useSelector(state => state.auth.token)
    const joinedTablesData = useSelector(state => state.lobby.joinedTablesData)

    useEffect(() => {
        let socket = null
        if (token) {
            socket = io(config.SOCKET_URL, {
                transports: ['websocket', 'polling'],
                query: {
                    authorization: token,
                },
            });
            // console.log("soc", socket);
            // socket.on("connect_error", (err) => {
            //     console.log(err);
            // });
            socket.on('connect', () => {
                // console.log(socket.id);
                // console.log('check connection', socket.connected);
            });
            socket.on('resLogout', (data) => {
                if (joinedTablesData?.length) {
                    console.log("has length reslogout");
                } else {
                    toast(
                        <div>
                            <div>{data?.message}</div>
                        </div>,
                        {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    );
                    unAuthorized()
                    socket ? socket.disconnect() : null
                    // console.log('socket reslogout');
                    // window.location.href = '/';
                }
            })
            // socket.on('connect', function () {
            //     console.log('check connection 2 connect', socket.connected);
            //     console.log("id", socket.id);
            // });
            // socket.on('disconnect', function () {
            //     console.log('check connection 2 disconnect', socket.connected);
            //     console.log("id", socket.id);
            // });
        } else {
            // console.log("else");
            socket ? socket.disconnect() : null
        }
        return () => socket ? socket.disconnect() : null
    }, [token, joinedTablesData])

    return (
        <>
            <ToastContainer
                position='top-right'
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default Socket
