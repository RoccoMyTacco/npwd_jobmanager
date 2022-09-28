import React, { ReactNode } from 'react';
import { Button, IconButton, Box, List, ListItem, ListItemText } from '@mui/material';
import { Job } from '../types/jobs';
import { useJobsValue, useSetJobs, useCurJobValue, useSetCurJob } from '../atoms/jobs-atoms';
import DeleteIcon from '@mui/icons-material/Delete';
import fetchNui from '../utils/fetchNui';
import { ServerPromiseResp } from '@project-error/npwd-types';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { styled } from "@mui/material/styles";
interface JobsListProps {
    isDarkMode: boolean;
  }

export const JobsList: React.FC<JobsListProps> = ({ isDarkMode}) => {
    const [deleteJob, SetDeleteJob] = React.useState("");
    const [Duty, setDuty] = React.useState(false);
    const jobs = useJobsValue();
    const currentJob = useCurJobValue();
    const setJobs = useSetJobs();
    const setCurrentJob = useSetCurJob();
    
    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '1000ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
        },
      }));

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
                        <IOSSwitch edge="end" onChange={handleToggleDuty(job.job, job.grade, currentJob[0]?.onDuty)} checked={currentJob[0]?.onDuty}/>
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