import React from "react";

type State = { hasError: boolean };

export default class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  state: State = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: any, info: any) {
    console.error(err, info);
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-xl">Something went wrong.</h2>
          <p className="text-muted">Please try again later.</p>
        </div>
      );
    return this.props.children;
  }
}
