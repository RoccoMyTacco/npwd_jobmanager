import React, { ReactNode } from 'react';
import { APP_PRIMARY_COLOR } from '../../app.theme';
import { Button, IconButton, Box, List, ListItem, ListItemText, Switch, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { Job, CurrentJob } from '../../types/jobs';
import { useJobsValue, useSetJobs, useCurJobValue, useSetCurJob } from '../../atoms/jobs-atoms';
import DeleteIcon from '@mui/icons-material/Delete';

interface JobsListProps {
    isDarkMode: boolean;
  }

export const JobsList: React.FC<JobsListProps> = ({ isDarkMode}) => {
    const [deleteJob, SetDeleteJob] = React.useState("");
    const jobs = useJobsValue();
    const currentJob = useCurJobValue();
    const setJobs = useSetJobs();
    const setCurrentJob = useSetCurJob();

    const handleDelete = (job: string) => () => {
        const index = jobs.map(jobD => jobD.job).indexOf(job);
        if (index > -1) {
            setJobs(jobs.filter(jobD => jobD.job !== job));
            setCurrentJob(currentJob.filter(jobD => jobD.job !== job));
        }
    };
    const handleDeleteToggle = (job: string) => () => {
        if (deleteJob == "") {
            SetDeleteJob(job);
        } else {
            SetDeleteJob("");
        }
    };
    const handleToggle = (value: string, grade: number) => () => {
        if (deleteJob !== "") {
            SetDeleteJob("");
        }
        if (currentJob[0]?.job === value) {
            setCurrentJob([]);
        } else {
            setCurrentJob([{job: value, grade: grade}]);
        }
      };
    return (
        <List disablePadding sx={{overflow: 'auto'}}>
             {jobs.map((job: Job) => (
                <ListItem key={job.job} divider>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',width: '100%'}}>
                        <ListItemText primaryTypographyProps={{color: isDarkMode ? '#fff' : '#000', fontSize: '17px'}} primary={job.jobLabel} secondary={job.gradeLabel}/>
                        {(deleteJob !== job.job) &&
                        <Switch edge="end" onChange={handleToggle(job.job, job.grade)} checked={currentJob[0]?.job === job.job ? true : false}/>
                        }
                        {(deleteJob == "" && currentJob[0]?.job === job.job) &&
                            <IconButton onClick={handleDeleteToggle(job.job)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                        {(deleteJob == job.job) &&
                              <Button variant="outlined" color="error">
                              Delete
                            </Button>
                        }
                    </Box>
                </ListItem>
            ))}
        </List>
    );
}
export default JobsList