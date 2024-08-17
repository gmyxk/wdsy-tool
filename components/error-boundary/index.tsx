import React from "react";

interface ErrorBoundaryProps {
  message?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
}
interface ErrorBoundaryStates {
  error?: Error | null;
  info?: {
    componentStack?: string;
  };
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryStates
> {
  constructor(props: {}) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // 更新 state 以触发 fallback UI
    return { error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 你可以将错误日志记录到错误报告服务
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      // 你可以渲染任何自定义的 fallback UI
      return <h1 className="text-center py-20">出错了。</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
