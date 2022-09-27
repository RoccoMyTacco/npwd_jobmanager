import { atom, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Job, CurrentJob } from '../types/jobs';
import { MockJobs, CurMockJobs } from '../utils/constants';
import { isEnvBrowser } from '../utils/misc';
import fetchNui from '../utils/fetchNui';
import { ServerPromiseResp } from '../types/common';

export const jobStates = {
  Jobs: atom({
    key: 'Jobs',
    default: selector<Job[]>({
      key: 'defaultJobs',
      get: () => {
        try {
          const resp = fetchNui<ServerPromiseResp<Job[]>>(
            'npwd:jobmanager:getPlayerJobs',
          );
          if (Object.keys(resp).length == 0) {
            console.log('no response data');
            if (isEnvBrowser()) {
                return MockJobs;
              }
            return [];
          }
          return [];
        } catch (e) {
          console.error(e);
          return [];
        }
      },
    }),
  }),
  CurJobs: atom({
    key: 'CurJobs',
    default: selector<CurrentJob[]>({
      key: 'defaultCurJobs',
      get: () => {
        try {
          const resp = fetchNui<ServerPromiseResp<CurrentJob[]>>(
            'npwd:jobmanager:getCurJob',
          );
          if (Object.keys(resp).length == 0) {
            console.log('no response data');
            if (isEnvBrowser()) {
                return CurMockJobs;
              }
            return [];
          }
          return [];
        } catch (e) {
          console.error(e);
          return [];
        }
      },
    }),
  }),
};

export const useJobsValue = () => useRecoilValue(jobStates.Jobs);
export const useSetJobs = () => useSetRecoilState(jobStates.Jobs);

export const useCurJobValue = () => useRecoilValue(jobStates.CurJobs);
export const useSetCurJob = () => useSetRecoilState(jobStates.CurJobs);
