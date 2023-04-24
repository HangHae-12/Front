import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
  useIsFetching,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import LoadingModal from "./components/Modals/LoadingModal";
import ErrorModal from "./components/Modals/AlertModal";
import { ThemeProvider } from "styled-components";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/globalstyle";
import Router from "./shared/Router";
import theme from "./styles/theme";
import instance from "./api/instance";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      queryFn: async ({ queryKey }) => {
        const { data } = await instance.get(queryKey[0]);
        return data;
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ error }) => (
              <ErrorModal error={error} onReset={reset} />
            )}
          >
            <ThemeProvider theme={theme}>
              <RecoilRoot>
                <GlobalStyle />
                <Router />
              </RecoilRoot>
            </ThemeProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </QueryClientProvider>
  );
};

export default App;
