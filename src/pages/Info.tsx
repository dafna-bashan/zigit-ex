import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TableCmp } from '../cmps/Table'
import { getUserProjects } from '../store/actions/userActionsCreators'
import { RootState } from '../store/reducers'

export const Info: React.FC = () => {

    const userProjects = useSelector((state: RootState) => state.userModule.projects)
    const user = useSelector((state: RootState) => state.userModule.loggedInUser)

    const dispatch = useDispatch()
    useEffect(() => {
        // if(!user){
        //     setTimeout(()=>{
        //         window.location.hash = '/'
        //     }, 3000)
        // } 
        dispatch(getUserProjects())
        console.log('proj', userProjects);
    }, [])

    useEffect(() => {
        console.log('proj', userProjects);
    }, [userProjects])


    const getProjectsStats = () => {
        if(!userProjects) return
        let avgCounter = 0
        let doneProjCounter = 0
        userProjects.forEach(project => {
            avgCounter += project.score
            if (project.madeDadeline) doneProjCounter++
        })
        const precOfDoneProj = (doneProjCounter / userProjects.length * 100).toFixed(2)
        const projectsScroeAvg = (avgCounter / userProjects.length).toFixed(2)
        console.log({precOfDoneProj, projectsScroeAvg});
        
        return {precOfDoneProj, projectsScroeAvg}
    }


    if (!userProjects || !userProjects.length) return <div className="user-info">loading</div>
    if (!user) return <div className="user-info">Please login first</div>
    return (
        <div className="user-info flex column align-center">
            <h1>User info</h1>
            <i className="fas fa-times"></i>
            <TableCmp data={[user.personalDetails]} />
            <h1>Projects info</h1>
            <p>Percentage of projects that met the deadline: {getProjectsStats()?.precOfDoneProj}</p>
            <p>Average score: {getProjectsStats()?.projectsScroeAvg}</p>
            <TableCmp data={userProjects} />
        </div>
    )
}
