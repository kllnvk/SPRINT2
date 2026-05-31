import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)
    const [started, setStarted] = useState(false)
    const start = () => {
        setStarted(true)
        const intervalId = window.setInterval(() => {
            setDate(new Date())
            console.log(1)
        }, 1000)
        setTimerId(intervalId)
    }

    const stop = () => {
        setStarted(false)
        clearInterval(timerId)
    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
        setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)
    }

    const getStringDate = (param: Date) => {
        const hours = param.getHours() < 10 ? '0' + param.getHours() : param.getHours()
        const minutes = param.getMinutes() < 10 ? '0' + param.getMinutes() : param.getMinutes()
        const seconds = param.getSeconds() < 10 ? '0' + param.getSeconds() : param.getSeconds()
        const dayOfWeek = param.toLocaleString('en-US', {weekday: 'long'})
        const month = param.toLocaleString('en-US', {month: 'long'})
        const formattedDate = date.toLocaleDateString('ru-RU')

        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            dayOfWeek: dayOfWeek,
            month: month,
            formattedDate: formattedDate
        }
    }

    const stringTime = `${getStringDate(date).hours}:${getStringDate(date).minutes}:${getStringDate(date).seconds}` // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringDate = getStringDate(date).formattedDate // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    const stringDay = getStringDate(date).dayOfWeek // пишут студенты
    const stringMonth = getStringDate(date).month // пишут студенты

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={started} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!started} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
