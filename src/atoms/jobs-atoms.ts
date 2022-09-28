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
      get: async() => {
        try {
          const resp = await fetchNui<ServerPromiseResp<Job[]>>('npwd:jobmanager:getPlayerJobs');
          if (!resp.data) {
            console.log('no response data');
            return [];
          }
          return resp.data;
        } catch (e) {
          if (isEnvBrowser()) {
            return MockJobs;
          }
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
      get: async() => {
        try {
          const resp = await fetchNui<ServerPromiseResp<CurrentJob[]>>(
            'npwd:jobmanager:getCurJob',
          );
          if (!resp.data) {
            console.log('no response data');
            return [];
          }
          return resp.data;
        } catch (e) {
          if (isEnvBrowser()) {
            return CurMockJobs;
          }
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
