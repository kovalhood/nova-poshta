import { useState } from 'react';
import s from './WeekSchedule.module.scss';

const WeekSchedule = ({schedule}) => {
    const [currentDate, setCurrentdate] = useState(Date.now());

    return <div className={s.branches__schedule}>
        {/* schedule dependencies for correct time of open/close display */}
        
        {new Date(currentDate).getDay() === 0 && schedule.Sunday !== '00:01-23:59' && schedule.Sunday.slice(0, 2) <= new Date(currentDate).getHours()
            ? <>{schedule.Sunday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {schedule.Sunday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { schedule.Monday.slice(0, 5) }</p> }</>
            : <></>
        }

        {new Date(currentDate).getDay() === 0 && schedule.Sunday !== '00:01-23:59' && schedule.Sunday.slice(0, 2) > new Date(currentDate).getHours()
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { schedule.Sunday.slice(0, 5) }</p>
            : <></>
        }

        {new Date(currentDate).getDay() === 1 && schedule.Monday !== '00:01-23:59' && schedule.Monday.slice(0, 2) <= new Date(currentDate).getHours()
            ? <>{schedule.Monday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {schedule.Monday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { schedule.Tuesday.slice(0, 5) }</p> }</>
            : <></>
        }

        {new Date(currentDate).getDay() === 1 && schedule.Monday !== '00:01-23:59' && schedule.Monday.slice(0, 2) > new Date(currentDate).getHours()
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { schedule.Monday.slice(0, 5) }</p>
            : <></>
        }

        {new Date(currentDate).getDay() === 2 && schedule.Tuesday !== '00:01-23:59' && schedule.Tuesday.slice(0, 2) <= new Date(currentDate).getHours()
            ? <>{schedule.Tuesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {schedule.Tuesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { schedule.Wednesday.slice(0, 5) }</p> }</>
            : <></>
        }

        {new Date(currentDate).getDay() === 2 && schedule.Tuesday !== '00:01-23:59' && schedule.Tuesday.slice(0, 2) > new Date(currentDate).getHours()
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { schedule.Tuesday.slice(0, 5) }</p>
            : <></>
        }

        {new Date(currentDate).getDay() === 3 && schedule.Wednesday !== '00:01-23:59' && schedule.Wednesday.slice(0, 2) <= new Date(currentDate).getHours()
            ? <>{schedule.Wednesday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {schedule.Wednesday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { schedule.Thursday.slice(0, 5) }</p> }</>
            : <></>
        }

        {new Date(currentDate).getDay() === 3 && schedule.Wednesday !== '00:01-23:59' && schedule.Wednesday.slice(0, 2) > new Date(currentDate).getHours()
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { schedule.Wednesday.slice(0, 5) }</p>
            : <></>
        }

        {new Date(currentDate).getDay() === 4 && schedule.Thursday !== '00:01-23:59' && schedule.Thursday.slice(0, 2) <= new Date(currentDate).getHours()
            ? <>{schedule.Thursday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {schedule.Thursday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { schedule.Friday.slice(0, 5) }</p> }</>
            : <></>
        }

        {new Date(currentDate).getDay() === 4 && schedule.Thursday !== '00:01-23:59' && schedule.Thursday.slice(0, 2) > new Date(currentDate).getHours()
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { schedule.Thursday.slice(0, 5) }</p>
            : <></>
        }

        {new Date(currentDate).getDay() === 5 && schedule.Friday !== '00:01-23:59' && schedule.Friday.slice(0, 2) <= new Date(currentDate).getHours()
            ? <>{schedule.Friday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {schedule.Friday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { schedule.Saturday.slice(0, 5) }</p> }</>
            : <></>
        }

        {new Date(currentDate).getDay() === 5 && schedule.Friday !== '00:01-23:59' && schedule.Friday.slice(0, 2) > new Date(currentDate).getHours()
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { schedule.Friday.slice(0, 5) }</p>
            : <></>
        }

        {new Date(currentDate).getDay() === 6 && schedule.Saturday !== '00:01-23:59' && schedule.Saturday.slice(0, 2) <= new Date(currentDate).getHours()
            ? <>{schedule.Saturday.slice(6, 8) > new Date(currentDate).getHours() ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {schedule.Saturday.slice(6, 11)}</p> : <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з { schedule.Sunday.slice(0, 5) }</p> }</>
            : <></>
        }

        {new Date(currentDate).getDay() === 6 && schedule.Saturday !== '00:01-23:59' && schedule.Saturday.slice(0, 2) > new Date(currentDate).getHours()
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Відкриється в { schedule.Saturday.slice(0, 5) }</p>
            : <></>
        }

        {schedule.Sunday === '00:01-23:59' && schedule.Monday === '00:01-23:59' && schedule.Tuesday === '00:01-23:59' && schedule.Wednesday === '00:01-23:59' && schedule.Thursday === '00:01-23:59' && schedule.Friday === '00:01-23:59' && schedule.Saturday === '00:01-23:59'
            ? <p className={s.branches__schedule_open}>Відчинено цілодобово</p>
            : <></>
        }

        {new Date(currentDate).getDay() === 0 && schedule.Sunday === '00:01-23:59' && schedule.Monday !== '00:01-23:59'
            ? <p><span className={s.branches__schedule_open}>Відчинено</span>&nbsp;до {schedule.Sunday.slice(6, 11)}</p>
            : <></>
        }
        

        {new Date(currentDate).getDay() === 0 && schedule.Sunday === "-"
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з {schedule.Monday.slice(0, 5)}</p>
            : <></>
        }

        {new Date(currentDate).getDay() !== 0 && schedule.Sunday === "-" && schedule.Tuesday === '00:01-23:59'
            ? <p className={s.branches__schedule_open}>Відчинено цілодобово</p>
            : <></>
        }

        {new Date(currentDate).getDay() === 0 && schedule.Sunday === "-" && schedule.Monday === "-" && schedule.Tuesday !== "-"
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо післязавтра з {schedule.Tuesday.slice(0, 5)}</p>
            : <></>
        }

        {new Date(currentDate).getDay() === 1 && schedule.Sunday === "-" && schedule.Monday === "-" && schedule.Tuesday !== "-"
            ? <p><span className={s.branches__schedule_close}>Зачинено</span>&nbsp;Чекаємо завтра з {schedule.Tuesday.slice(0, 5)}</p>
            : <></>
        }
    </div>
}

export default WeekSchedule;