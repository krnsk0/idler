import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      background: string;
      primary: string;
      secondary: string;
      disabled: string;
      progressBar: string;
      dimProgressBar: string;
    };
  }
}
