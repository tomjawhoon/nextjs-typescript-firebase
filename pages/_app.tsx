import React from 'react';
import store from '../src/redux/store';
import { fetchUser } from '../src/redux/actions';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    ctx.reduxStore = store;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    fetchUser()(store.dispatch);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}
