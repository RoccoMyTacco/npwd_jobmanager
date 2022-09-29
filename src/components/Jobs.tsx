import React from 'react';
import { Button, IconButton, Box, List, ListItem, ListItemText, Switch } from '@mui/material';
import { Job } from '../types/jobs';
import { useJobsValue, useSetJobs, useCurJobValue, useSetCurJob } from '../atoms/jobs-atoms';
import DeleteIcon from '@mui/icons-material/Delete';
import fetchNui from '../utils/fetchNui';
import { ServerPromiseResp } from '@project-error/npwd-types';
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
        fetchNui<ServerPromiseResp>('npwd:jobmanager:removeJob', { job }).then((res) => {
            const index = jobs.map(jobD => jobD.job).indexOf(job);
            if (index > -1) {
                jobs.splice(index, 1);
                setJobs(jobs);
                setCurrentJob([]);
            }
          });
    };
    const handleDeleteToggle = (job: string) => () => {
        if (deleteJob == "") {
            SetDeleteJob(job);
        } else {
            SetDeleteJob("");
        }
    };
    const handleToggleDuty = (value: string, grade: number, onDuty: boolean) => () => {
        fetchNui<ServerPromiseResp>('npwd:jobmanager:toggleDuty', {}).then((res) => {
            if (deleteJob !== "") {
                SetDeleteJob("");
            }
            if (currentJob[0]?.onDuty == true) {
                setCurrentJob([{ job: value, grade: grade, onDuty: false }]);
            } else {
                setCurrentJob([{ job: value, grade: grade, onDuty: true }]);
            }
          });
      };
      const handleToggleJob = (value: string, grade: number, onDuty: boolean) => () => {
        fetchNui<ServerPromiseResp>('npwd:jobmanager:changeJob', { value, grade }).then((res) => {
            if (deleteJob !== "") {
                SetDeleteJob("");
            }
            setCurrentJob([{ job: value, grade: grade, onDuty: true }]);
          });

        
      };
    return (
        <List disablePadding sx={{overflow: 'auto'}}>
             {jobs.map((job: Job) => (
                <ListItem key={job.job} divider>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',width: '100%'}}>
                        <ListItemText primaryTypographyProps={{color: isDarkMode ? '#fff' : '#000', fontSize: '17px'}} primary={job.jobLabel} secondary={job.gradeLabel}/>
                        {(deleteJob !== job.job && currentJob[0]?.job !== job.job) &&
                            <Button size="small" variant="outlined"  onClick={handleToggleJob(job.job, job.grade, currentJob[0]?.onDuty)}>Toggle</Button>
                        }
                        {(deleteJob !== job.job && currentJob[0]?.job === job.job) &&
                        <Switch edge="end" onChange={handleToggleDuty(job.job, job.grade, currentJob[0]?.onDuty)} checked={currentJob[0]?.onDuty}/>
                        }
                        {(deleteJob == "" && currentJob[0]?.job === job.job) &&
                            <IconButton color="error" onClick={handleDeleteToggle(job.job)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                        {(deleteJob == job.job) &&
                              <Button variant="outlined" color="error" onClick={handleDelete(job.job)}>
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