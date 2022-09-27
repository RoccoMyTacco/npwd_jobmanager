import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { NuiProvider, useNuiEvent } from 'react-fivem-hooks';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import JobsList from './components/JobList/Jobs';
import { Job } from './types/jobs';
import { IPhoneSettings } from '@project-error/npwd-types';
import fetchNui from './utils/fetchNui';
import { ServerPromiseResp } from './types/common';
import { i18n } from 'i18next';
import {
  Theme,
  StyledEngineProvider,
  Paper,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from '@mui/material';
import ThemeSwitchProvider from './ThemeSwitchProvider';
import { HomeRounded, InfoRounded } from '@mui/icons-material';
import Header, { HEADER_HEIGHT } from './components/Header';
import { path } from '../npwd.config';
import { MockJobs } from './utils/constants';
import { isEnvBrowser } from './utils/misc';
const Container = styled(Paper)`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-height: 100%;
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.5rem;
  max-height: calc(100% - 3.5rem - ${HEADER_HEIGHT});
  overflow: auto;
`;

const LinkItem = styled(Link)`
  font-family: sans-serif;
  text-decoration: none;
`;

const Footer = styled.footer`
  margin-top: auto;
`;

interface AppProps {
  theme: Theme;
  i18n: i18n;
  settings: IPhoneSettings;
}

const App = (props: AppProps) => {
  const isDarkMode = props.theme.palette.mode === 'dark';

  return (
    <StyledEngineProvider injectFirst>
      <ThemeSwitchProvider mode={props.theme.palette.mode}>
        <Container square elevation={0}>
          <Header>Employment Manager</Header>
          <JobsList isDarkMode={isDarkMode}/>
        </Container>
      </ThemeSwitchProvider>
    </StyledEngineProvider>
  );
};

const WithProviders: React.FC<AppProps> = (props) => (
  <RecoilRoot>
    <NuiProvider>
      <App {...props} />
    </NuiProvider>
  </RecoilRoot>
);

export default WithProviders;
