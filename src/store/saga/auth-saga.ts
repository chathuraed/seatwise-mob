import {call, put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../../services/auth/auth-service';
import AppService from '../../services/generic/app-service';
import {appActions} from '../reducer/app-slice';
import {authActions} from '../reducer/auth-slice';

export function* loginUserGenerator({
  payload,
}: {
  payload: any;
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Logging in...'));
    yield put(appActions.removeErrors());

    const response = yield call(AuthService.loginUser, {
      email: payload.email,
      password: payload.password,
    });
    console.log('response', response.status);

    if (response.status === 200) {
      const {data} = response;
      // let data = yield call([response, 'json']);

      AppService.accessToken = data.token;
      AppService.refreshToken = data.refreshToken;

      console.log('data.token', data.token);
      console.log('data.refreshToken', data.refreshToken);

      yield call(AsyncStorage.setItem, 'authToken', data.token);
      yield call(AsyncStorage.setItem, 'refreshToken', data.refreshToken);

      // if (payload.rememberMe) {
      //   yield call(AsyncStorage.setItem, 'rememberMe', 'true');
      // }

      //   const accountReponse = yield call(AuthService.getAccount);
      //   if (accountReponse.status === 200) {
      //     let accountData = yield call([accountReponse, 'json']);
      //     yield put(authActions.setCurrentAccount(accountData));
      //   }

      yield put(authActions.loginUserSuccess());
      //   yield put(
      //     appActions.navigateToLocation({
      //       screen: 'App',
      //     }),
      //   );
    } else if (response.status === 400) {
      let data = yield call([response, 'json']);
      console.log('test', data);

      yield put(
        appActions.setError({
          error: {
            title: '',
            message: data.Message,
          },
          type: '',
        }),
      );
    }
  } catch (error) {
    console.log(error);
    yield put(
      appActions.setError({
        error: {
          title: '',
          message: error.data.error,
        },
        type: '',
      }),
    );
  } finally {
    yield put(appActions.removeLoading());
  }
}

export function* checkAuthTokenGenerator({
  payload,
}: {
  payload: any;
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Loading...'));

    const authToken = yield call(AsyncStorage.getItem, 'authToken');
    const refreshToken = yield call(AsyncStorage.getItem, 'refreshToken');
    const rememberMe = yield call(AsyncStorage.getItem, 'rememberMe');
    const loginTimestamp = yield call(AsyncStorage.getItem, 'loginTimestamp');

    AppService.accessToken = authToken;

    if (!authToken || !loginTimestamp) {
      yield put(
        appActions.navigateToLocation({
          screen: 'Welcome',
        }),
      );
      yield put(appActions.removeLoading());
    } else {
      const currentTime = Date.now();
      console.log('time', currentTime, loginTimestamp);
      const differenceInMilliseconds = Math.abs(currentTime - loginTimestamp);

      // Convert milliseconds to minutes and seconds
      const minutes = Math.floor(differenceInMilliseconds / 60000);
      const seconds = Math.floor((differenceInMilliseconds % 60000) / 1000);

      console.log(`Difference: ${minutes} minutes ${seconds} seconds`);

      const fifteenMinutes = 15 * 60 * 1000; // 15 minutes in milliseconds
      // Check if the difference is greater than 15 minutes
      const isGreaterThanFifteenMinutes =
        differenceInMilliseconds > fifteenMinutes;

      console.log('isGreaterThanFifteenMinutes', isGreaterThanFifteenMinutes);

      if (isGreaterThanFifteenMinutes) {
        if (rememberMe) {
          const response = yield call(AuthService.refreshToken, {
            token: authToken,
            refreshToken: refreshToken,
          });

          if (response.status === 200) {
            let data = yield call([response, 'json']);

            AppService.accessToken = data.token;
            AppService.refreshToken = data.refreshToken;

            yield call(AsyncStorage.setItem, 'authToken', data.token);
            yield call(AsyncStorage.setItem, 'refreshToken', data.refreshToken);

            if (rememberMe === 'true') {
              yield call(
                AsyncStorage.setItem,
                'loginTimestamp',
                Date.now().toString(),
              );
            }

            const accountReponse = yield call(AuthService.getAccount);
            if (accountReponse.status === 200) {
              let accountData = yield call([accountReponse, 'json']);
              yield put(authActions.setCurrentAccount(accountData));
            }

            yield put(authActions.loginUserSuccess());
            yield put(
              appActions.navigateToLocation({
                screen: 'App',
                charAt: function (pos: number): string {
                  throw new Error('Function not implemented.');
                },
                charCodeAt: function (index: number): number {
                  throw new Error('Function not implemented.');
                },
                concat: function (...strings: string[]): string {
                  throw new Error('Function not implemented.');
                },
                indexOf: function (
                  searchString: string,
                  position?: number | undefined,
                ): number {
                  throw new Error('Function not implemented.');
                },
                lastIndexOf: function (
                  searchString: string,
                  position?: number | undefined,
                ): number {
                  throw new Error('Function not implemented.');
                },
                localeCompare: function (that: string): number {
                  throw new Error('Function not implemented.');
                },
                match: function (
                  regexp: string | RegExp,
                ): RegExpMatchArray | null {
                  throw new Error('Function not implemented.');
                },
                replace: function (
                  searchValue: string | RegExp,
                  replaceValue: string,
                ): string {
                  throw new Error('Function not implemented.');
                },
                search: function (regexp: string | RegExp): number {
                  throw new Error('Function not implemented.');
                },
                slice: function (
                  start?: number | undefined,
                  end?: number | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                split: function (
                  separator: string | RegExp,
                  limit?: number | undefined,
                ): string[] {
                  throw new Error('Function not implemented.');
                },
                substring: function (
                  start: number,
                  end?: number | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                toLowerCase: function (): string {
                  throw new Error('Function not implemented.');
                },
                toLocaleLowerCase: function (
                  locales?: string | string[] | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                toUpperCase: function (): string {
                  throw new Error('Function not implemented.');
                },
                toLocaleUpperCase: function (
                  locales?: string | string[] | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                trim: function (): string {
                  throw new Error('Function not implemented.');
                },
                length: 0,
                substr: function (
                  from: number,
                  length?: number | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                codePointAt: function (pos: number): number | undefined {
                  throw new Error('Function not implemented.');
                },
                includes: function (
                  searchString: string,
                  position?: number | undefined,
                ): boolean {
                  throw new Error('Function not implemented.');
                },
                endsWith: function (
                  searchString: string,
                  endPosition?: number | undefined,
                ): boolean {
                  throw new Error('Function not implemented.');
                },
                normalize: function (
                  form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD',
                ): string {
                  throw new Error('Function not implemented.');
                },
                repeat: function (count: number): string {
                  throw new Error('Function not implemented.');
                },
                startsWith: function (
                  searchString: string,
                  position?: number | undefined,
                ): boolean {
                  throw new Error('Function not implemented.');
                },
                anchor: function (name: string): string {
                  throw new Error('Function not implemented.');
                },
                big: function (): string {
                  throw new Error('Function not implemented.');
                },
                blink: function (): string {
                  throw new Error('Function not implemented.');
                },
                bold: function (): string {
                  throw new Error('Function not implemented.');
                },
                fixed: function (): string {
                  throw new Error('Function not implemented.');
                },
                fontcolor: function (color: string): string {
                  throw new Error('Function not implemented.');
                },
                fontsize: function (size: number): string {
                  throw new Error('Function not implemented.');
                },
                italics: function (): string {
                  throw new Error('Function not implemented.');
                },
                link: function (url: string): string {
                  throw new Error('Function not implemented.');
                },
                small: function (): string {
                  throw new Error('Function not implemented.');
                },
                strike: function (): string {
                  throw new Error('Function not implemented.');
                },
                sub: function (): string {
                  throw new Error('Function not implemented.');
                },
                sup: function (): string {
                  throw new Error('Function not implemented.');
                },
                padStart: function (
                  maxLength: number,
                  fillString?: string | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                padEnd: function (
                  maxLength: number,
                  fillString?: string | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                trimEnd: function (): string {
                  throw new Error('Function not implemented.');
                },
                trimStart: function (): string {
                  throw new Error('Function not implemented.');
                },
                trimLeft: function (): string {
                  throw new Error('Function not implemented.');
                },
                trimRight: function (): string {
                  throw new Error('Function not implemented.');
                },
                matchAll: function (
                  regexp: RegExp,
                ): IterableIterator<RegExpMatchArray> {
                  throw new Error('Function not implemented.');
                },
                replaceAll: function (
                  searchValue: string | RegExp,
                  replaceValue: string,
                ): string {
                  throw new Error('Function not implemented.');
                },
                at: function (index: number): string | undefined {
                  throw new Error('Function not implemented.');
                },
                [Symbol.iterator]: function (): IterableIterator<string> {
                  throw new Error('Function not implemented.');
                },
              }),
            );
          } else {
            yield put(
              appActions.navigateToLocation({
                screen: 'Welcome',
                charAt: function (pos: number): string {
                  throw new Error('Function not implemented.');
                },
                charCodeAt: function (index: number): number {
                  throw new Error('Function not implemented.');
                },
                concat: function (...strings: string[]): string {
                  throw new Error('Function not implemented.');
                },
                indexOf: function (
                  searchString: string,
                  position?: number | undefined,
                ): number {
                  throw new Error('Function not implemented.');
                },
                lastIndexOf: function (
                  searchString: string,
                  position?: number | undefined,
                ): number {
                  throw new Error('Function not implemented.');
                },
                localeCompare: function (that: string): number {
                  throw new Error('Function not implemented.');
                },
                match: function (
                  regexp: string | RegExp,
                ): RegExpMatchArray | null {
                  throw new Error('Function not implemented.');
                },
                replace: function (
                  searchValue: string | RegExp,
                  replaceValue: string,
                ): string {
                  throw new Error('Function not implemented.');
                },
                search: function (regexp: string | RegExp): number {
                  throw new Error('Function not implemented.');
                },
                slice: function (
                  start?: number | undefined,
                  end?: number | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                split: function (
                  separator: string | RegExp,
                  limit?: number | undefined,
                ): string[] {
                  throw new Error('Function not implemented.');
                },
                substring: function (
                  start: number,
                  end?: number | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                toLowerCase: function (): string {
                  throw new Error('Function not implemented.');
                },
                toLocaleLowerCase: function (
                  locales?: string | string[] | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                toUpperCase: function (): string {
                  throw new Error('Function not implemented.');
                },
                toLocaleUpperCase: function (
                  locales?: string | string[] | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                trim: function (): string {
                  throw new Error('Function not implemented.');
                },
                length: 0,
                substr: function (
                  from: number,
                  length?: number | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                codePointAt: function (pos: number): number | undefined {
                  throw new Error('Function not implemented.');
                },
                includes: function (
                  searchString: string,
                  position?: number | undefined,
                ): boolean {
                  throw new Error('Function not implemented.');
                },
                endsWith: function (
                  searchString: string,
                  endPosition?: number | undefined,
                ): boolean {
                  throw new Error('Function not implemented.');
                },
                normalize: function (
                  form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD',
                ): string {
                  throw new Error('Function not implemented.');
                },
                repeat: function (count: number): string {
                  throw new Error('Function not implemented.');
                },
                startsWith: function (
                  searchString: string,
                  position?: number | undefined,
                ): boolean {
                  throw new Error('Function not implemented.');
                },
                anchor: function (name: string): string {
                  throw new Error('Function not implemented.');
                },
                big: function (): string {
                  throw new Error('Function not implemented.');
                },
                blink: function (): string {
                  throw new Error('Function not implemented.');
                },
                bold: function (): string {
                  throw new Error('Function not implemented.');
                },
                fixed: function (): string {
                  throw new Error('Function not implemented.');
                },
                fontcolor: function (color: string): string {
                  throw new Error('Function not implemented.');
                },
                fontsize: function (size: number): string {
                  throw new Error('Function not implemented.');
                },
                italics: function (): string {
                  throw new Error('Function not implemented.');
                },
                link: function (url: string): string {
                  throw new Error('Function not implemented.');
                },
                small: function (): string {
                  throw new Error('Function not implemented.');
                },
                strike: function (): string {
                  throw new Error('Function not implemented.');
                },
                sub: function (): string {
                  throw new Error('Function not implemented.');
                },
                sup: function (): string {
                  throw new Error('Function not implemented.');
                },
                padStart: function (
                  maxLength: number,
                  fillString?: string | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                padEnd: function (
                  maxLength: number,
                  fillString?: string | undefined,
                ): string {
                  throw new Error('Function not implemented.');
                },
                trimEnd: function (): string {
                  throw new Error('Function not implemented.');
                },
                trimStart: function (): string {
                  throw new Error('Function not implemented.');
                },
                trimLeft: function (): string {
                  throw new Error('Function not implemented.');
                },
                trimRight: function (): string {
                  throw new Error('Function not implemented.');
                },
                matchAll: function (
                  regexp: RegExp,
                ): IterableIterator<RegExpMatchArray> {
                  throw new Error('Function not implemented.');
                },
                replaceAll: function (
                  searchValue: string | RegExp,
                  replaceValue: string,
                ): string {
                  throw new Error('Function not implemented.');
                },
                at: function (index: number): string | undefined {
                  throw new Error('Function not implemented.');
                },
                [Symbol.iterator]: function (): IterableIterator<string> {
                  throw new Error('Function not implemented.');
                },
              }),
            );
          }
        } else {
          yield call(logoutUserGenerator, {payload});
        }
      } else {
        yield put(authActions.loginUserSuccess());
        yield put(
          appActions.navigateToLocation({
            screen: 'App',
            charAt: function (pos: number): string {
              throw new Error('Function not implemented.');
            },
            charCodeAt: function (index: number): number {
              throw new Error('Function not implemented.');
            },
            concat: function (...strings: string[]): string {
              throw new Error('Function not implemented.');
            },
            indexOf: function (
              searchString: string,
              position?: number | undefined,
            ): number {
              throw new Error('Function not implemented.');
            },
            lastIndexOf: function (
              searchString: string,
              position?: number | undefined,
            ): number {
              throw new Error('Function not implemented.');
            },
            localeCompare: function (that: string): number {
              throw new Error('Function not implemented.');
            },
            match: function (regexp: string | RegExp): RegExpMatchArray | null {
              throw new Error('Function not implemented.');
            },
            replace: function (
              searchValue: string | RegExp,
              replaceValue: string,
            ): string {
              throw new Error('Function not implemented.');
            },
            search: function (regexp: string | RegExp): number {
              throw new Error('Function not implemented.');
            },
            slice: function (
              start?: number | undefined,
              end?: number | undefined,
            ): string {
              throw new Error('Function not implemented.');
            },
            split: function (
              separator: string | RegExp,
              limit?: number | undefined,
            ): string[] {
              throw new Error('Function not implemented.');
            },
            substring: function (
              start: number,
              end?: number | undefined,
            ): string {
              throw new Error('Function not implemented.');
            },
            toLowerCase: function (): string {
              throw new Error('Function not implemented.');
            },
            toLocaleLowerCase: function (
              locales?: string | string[] | undefined,
            ): string {
              throw new Error('Function not implemented.');
            },
            toUpperCase: function (): string {
              throw new Error('Function not implemented.');
            },
            toLocaleUpperCase: function (
              locales?: string | string[] | undefined,
            ): string {
              throw new Error('Function not implemented.');
            },
            trim: function (): string {
              throw new Error('Function not implemented.');
            },
            length: 0,
            substr: function (
              from: number,
              length?: number | undefined,
            ): string {
              throw new Error('Function not implemented.');
            },
            codePointAt: function (pos: number): number | undefined {
              throw new Error('Function not implemented.');
            },
            includes: function (
              searchString: string,
              position?: number | undefined,
            ): boolean {
              throw new Error('Function not implemented.');
            },
            endsWith: function (
              searchString: string,
              endPosition?: number | undefined,
            ): boolean {
              throw new Error('Function not implemented.');
            },
            normalize: function (
              form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD',
            ): string {
              throw new Error('Function not implemented.');
            },
            repeat: function (count: number): string {
              throw new Error('Function not implemented.');
            },
            startsWith: function (
              searchString: string,
              position?: number | undefined,
            ): boolean {
              throw new Error('Function not implemented.');
            },
            anchor: function (name: string): string {
              throw new Error('Function not implemented.');
            },
            big: function (): string {
              throw new Error('Function not implemented.');
            },
            blink: function (): string {
              throw new Error('Function not implemented.');
            },
            bold: function (): string {
              throw new Error('Function not implemented.');
            },
            fixed: function (): string {
              throw new Error('Function not implemented.');
            },
            fontcolor: function (color: string): string {
              throw new Error('Function not implemented.');
            },
            fontsize: function (size: number): string {
              throw new Error('Function not implemented.');
            },
            italics: function (): string {
              throw new Error('Function not implemented.');
            },
            link: function (url: string): string {
              throw new Error('Function not implemented.');
            },
            small: function (): string {
              throw new Error('Function not implemented.');
            },
            strike: function (): string {
              throw new Error('Function not implemented.');
            },
            sub: function (): string {
              throw new Error('Function not implemented.');
            },
            sup: function (): string {
              throw new Error('Function not implemented.');
            },
            padStart: function (
              maxLength: number,
              fillString?: string | undefined,
            ): string {
              throw new Error('Function not implemented.');
            },
            padEnd: function (
              maxLength: number,
              fillString?: string | undefined,
            ): string {
              throw new Error('Function not implemented.');
            },
            trimEnd: function (): string {
              throw new Error('Function not implemented.');
            },
            trimStart: function (): string {
              throw new Error('Function not implemented.');
            },
            trimLeft: function (): string {
              throw new Error('Function not implemented.');
            },
            trimRight: function (): string {
              throw new Error('Function not implemented.');
            },
            matchAll: function (
              regexp: RegExp,
            ): IterableIterator<RegExpMatchArray> {
              throw new Error('Function not implemented.');
            },
            replaceAll: function (
              searchValue: string | RegExp,
              replaceValue: string,
            ): string {
              throw new Error('Function not implemented.');
            },
            at: function (index: number): string | undefined {
              throw new Error('Function not implemented.');
            },
            [Symbol.iterator]: function (): IterableIterator<string> {
              throw new Error('Function not implemented.');
            },
          }),
        );
      }

      yield put(appActions.removeLoading());
    }
  } catch (error) {
    yield put(
      appActions.navigateToLocation({
        screen: 'Welcome',
      }),
    );
  }
}

export function* refreshAuthTokenGenerator({
  payload,
}: {
  payload: any;
}): Generator<any, void, any> {
  console.log('refreshAuthTokenGenerator');
  try {
    const authToken = yield call(AsyncStorage.getItem, 'authToken');
    const refreshToken = yield call(AsyncStorage.getItem, 'refreshToken');
    const rememberMe = yield call(AsyncStorage.getItem, 'rememberMe');

    console.log('rememberMe', rememberMe);
    console.log('token', authToken);
    console.log('refreshToken', refreshToken);

    const response = yield call(AuthService.refreshToken, {
      token: authToken,
      refreshToken: refreshToken,
    });

    if (response.status === 200) {
      let data = yield call([response, 'json']);

      AppService.accessToken = data.token;
      AppService.refreshToken = data.refreshToken;
      if (rememberMe) {
        yield call(AsyncStorage.setItem, 'authToken', data.token);
        yield call(AsyncStorage.setItem, 'refreshToken', data.refreshToken);
      }

      yield put(authActions.loginUserSuccess());
      yield put(
        appActions.navigateToLocation({
          screen: 'App',
          charAt: function (pos: number): string {
            throw new Error('Function not implemented.');
          },
          charCodeAt: function (index: number): number {
            throw new Error('Function not implemented.');
          },
          concat: function (...strings: string[]): string {
            throw new Error('Function not implemented.');
          },
          indexOf: function (
            searchString: string,
            position?: number | undefined,
          ): number {
            throw new Error('Function not implemented.');
          },
          lastIndexOf: function (
            searchString: string,
            position?: number | undefined,
          ): number {
            throw new Error('Function not implemented.');
          },
          localeCompare: function (that: string): number {
            throw new Error('Function not implemented.');
          },
          match: function (regexp: string | RegExp): RegExpMatchArray | null {
            throw new Error('Function not implemented.');
          },
          replace: function (
            searchValue: string | RegExp,
            replaceValue: string,
          ): string {
            throw new Error('Function not implemented.');
          },
          search: function (regexp: string | RegExp): number {
            throw new Error('Function not implemented.');
          },
          slice: function (
            start?: number | undefined,
            end?: number | undefined,
          ): string {
            throw new Error('Function not implemented.');
          },
          split: function (
            separator: string | RegExp,
            limit?: number | undefined,
          ): string[] {
            throw new Error('Function not implemented.');
          },
          substring: function (
            start: number,
            end?: number | undefined,
          ): string {
            throw new Error('Function not implemented.');
          },
          toLowerCase: function (): string {
            throw new Error('Function not implemented.');
          },
          toLocaleLowerCase: function (
            locales?: string | string[] | undefined,
          ): string {
            throw new Error('Function not implemented.');
          },
          toUpperCase: function (): string {
            throw new Error('Function not implemented.');
          },
          toLocaleUpperCase: function (
            locales?: string | string[] | undefined,
          ): string {
            throw new Error('Function not implemented.');
          },
          trim: function (): string {
            throw new Error('Function not implemented.');
          },
          length: 0,
          substr: function (from: number, length?: number | undefined): string {
            throw new Error('Function not implemented.');
          },
          codePointAt: function (pos: number): number | undefined {
            throw new Error('Function not implemented.');
          },
          includes: function (
            searchString: string,
            position?: number | undefined,
          ): boolean {
            throw new Error('Function not implemented.');
          },
          endsWith: function (
            searchString: string,
            endPosition?: number | undefined,
          ): boolean {
            throw new Error('Function not implemented.');
          },
          normalize: function (form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): string {
            throw new Error('Function not implemented.');
          },
          repeat: function (count: number): string {
            throw new Error('Function not implemented.');
          },
          startsWith: function (
            searchString: string,
            position?: number | undefined,
          ): boolean {
            throw new Error('Function not implemented.');
          },
          anchor: function (name: string): string {
            throw new Error('Function not implemented.');
          },
          big: function (): string {
            throw new Error('Function not implemented.');
          },
          blink: function (): string {
            throw new Error('Function not implemented.');
          },
          bold: function (): string {
            throw new Error('Function not implemented.');
          },
          fixed: function (): string {
            throw new Error('Function not implemented.');
          },
          fontcolor: function (color: string): string {
            throw new Error('Function not implemented.');
          },
          fontsize: function (size: number): string {
            throw new Error('Function not implemented.');
          },
          italics: function (): string {
            throw new Error('Function not implemented.');
          },
          link: function (url: string): string {
            throw new Error('Function not implemented.');
          },
          small: function (): string {
            throw new Error('Function not implemented.');
          },
          strike: function (): string {
            throw new Error('Function not implemented.');
          },
          sub: function (): string {
            throw new Error('Function not implemented.');
          },
          sup: function (): string {
            throw new Error('Function not implemented.');
          },
          padStart: function (
            maxLength: number,
            fillString?: string | undefined,
          ): string {
            throw new Error('Function not implemented.');
          },
          padEnd: function (
            maxLength: number,
            fillString?: string | undefined,
          ): string {
            throw new Error('Function not implemented.');
          },
          trimEnd: function (): string {
            throw new Error('Function not implemented.');
          },
          trimStart: function (): string {
            throw new Error('Function not implemented.');
          },
          trimLeft: function (): string {
            throw new Error('Function not implemented.');
          },
          trimRight: function (): string {
            throw new Error('Function not implemented.');
          },
          matchAll: function (
            regexp: RegExp,
          ): IterableIterator<RegExpMatchArray> {
            throw new Error('Function not implemented.');
          },
          replaceAll: function (
            searchValue: string | RegExp,
            replaceValue: string,
          ): string {
            throw new Error('Function not implemented.');
          },
          at: function (index: number): string | undefined {
            throw new Error('Function not implemented.');
          },
          [Symbol.iterator]: function (): IterableIterator<string> {
            throw new Error('Function not implemented.');
          },
        }),
      );
    }
  } catch (error) {
    yield put(
      appActions.navigateToLocation({
        screen: 'Welcome',
        charAt: function (pos: number): string {
          throw new Error('Function not implemented.');
        },
        charCodeAt: function (index: number): number {
          throw new Error('Function not implemented.');
        },
        concat: function (...strings: string[]): string {
          throw new Error('Function not implemented.');
        },
        indexOf: function (
          searchString: string,
          position?: number | undefined,
        ): number {
          throw new Error('Function not implemented.');
        },
        lastIndexOf: function (
          searchString: string,
          position?: number | undefined,
        ): number {
          throw new Error('Function not implemented.');
        },
        localeCompare: function (that: string): number {
          throw new Error('Function not implemented.');
        },
        match: function (regexp: string | RegExp): RegExpMatchArray | null {
          throw new Error('Function not implemented.');
        },
        replace: function (
          searchValue: string | RegExp,
          replaceValue: string,
        ): string {
          throw new Error('Function not implemented.');
        },
        search: function (regexp: string | RegExp): number {
          throw new Error('Function not implemented.');
        },
        slice: function (
          start?: number | undefined,
          end?: number | undefined,
        ): string {
          throw new Error('Function not implemented.');
        },
        split: function (
          separator: string | RegExp,
          limit?: number | undefined,
        ): string[] {
          throw new Error('Function not implemented.');
        },
        substring: function (start: number, end?: number | undefined): string {
          throw new Error('Function not implemented.');
        },
        toLowerCase: function (): string {
          throw new Error('Function not implemented.');
        },
        toLocaleLowerCase: function (
          locales?: string | string[] | undefined,
        ): string {
          throw new Error('Function not implemented.');
        },
        toUpperCase: function (): string {
          throw new Error('Function not implemented.');
        },
        toLocaleUpperCase: function (
          locales?: string | string[] | undefined,
        ): string {
          throw new Error('Function not implemented.');
        },
        trim: function (): string {
          throw new Error('Function not implemented.');
        },
        length: 0,
        substr: function (from: number, length?: number | undefined): string {
          throw new Error('Function not implemented.');
        },
        codePointAt: function (pos: number): number | undefined {
          throw new Error('Function not implemented.');
        },
        includes: function (
          searchString: string,
          position?: number | undefined,
        ): boolean {
          throw new Error('Function not implemented.');
        },
        endsWith: function (
          searchString: string,
          endPosition?: number | undefined,
        ): boolean {
          throw new Error('Function not implemented.');
        },
        normalize: function (form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): string {
          throw new Error('Function not implemented.');
        },
        repeat: function (count: number): string {
          throw new Error('Function not implemented.');
        },
        startsWith: function (
          searchString: string,
          position?: number | undefined,
        ): boolean {
          throw new Error('Function not implemented.');
        },
        anchor: function (name: string): string {
          throw new Error('Function not implemented.');
        },
        big: function (): string {
          throw new Error('Function not implemented.');
        },
        blink: function (): string {
          throw new Error('Function not implemented.');
        },
        bold: function (): string {
          throw new Error('Function not implemented.');
        },
        fixed: function (): string {
          throw new Error('Function not implemented.');
        },
        fontcolor: function (color: string): string {
          throw new Error('Function not implemented.');
        },
        fontsize: function (size: number): string {
          throw new Error('Function not implemented.');
        },
        italics: function (): string {
          throw new Error('Function not implemented.');
        },
        link: function (url: string): string {
          throw new Error('Function not implemented.');
        },
        small: function (): string {
          throw new Error('Function not implemented.');
        },
        strike: function (): string {
          throw new Error('Function not implemented.');
        },
        sub: function (): string {
          throw new Error('Function not implemented.');
        },
        sup: function (): string {
          throw new Error('Function not implemented.');
        },
        padStart: function (
          maxLength: number,
          fillString?: string | undefined,
        ): string {
          throw new Error('Function not implemented.');
        },
        padEnd: function (
          maxLength: number,
          fillString?: string | undefined,
        ): string {
          throw new Error('Function not implemented.');
        },
        trimEnd: function (): string {
          throw new Error('Function not implemented.');
        },
        trimStart: function (): string {
          throw new Error('Function not implemented.');
        },
        trimLeft: function (): string {
          throw new Error('Function not implemented.');
        },
        trimRight: function (): string {
          throw new Error('Function not implemented.');
        },
        matchAll: function (
          regexp: RegExp,
        ): IterableIterator<RegExpMatchArray> {
          throw new Error('Function not implemented.');
        },
        replaceAll: function (
          searchValue: string | RegExp,
          replaceValue: string,
        ): string {
          throw new Error('Function not implemented.');
        },
        at: function (index: number): string | undefined {
          throw new Error('Function not implemented.');
        },
        [Symbol.iterator]: function (): IterableIterator<string> {
          throw new Error('Function not implemented.');
        },
      }),
    );
  } finally {
    yield put(appActions.removeLoading());
  }
}

export function* submitSignUpFormGenerator({
  payload,
}: {
  payload: any;
}): Generator<any, void, any> {
  try {
    yield put(appActions.setLoading('Saving...'));
    yield put(appActions.removeErrors());

    // const response = yield call(AuthService.submitSignUpForm, payload);

    // if (response.status === 200) {
    //   let data = yield call([response, 'json']);

    //   yield put(authActions.setSignUpUserId(data.userId));
    //   yield put(authActions.setSignUpUserEmail(payload.email));
    //   yield put(authActions.setSignUpStep(SIGN_UP_STEP.ENTER_OTP));
    // } else if (response.status === 400) {
    //   let data = yield call([response, 'json']);

    //   console.log('error', data);

    //   let errorMessage = '';
    //   if (data.errors) {
    //     const firstKey = Object.keys(data.errors)[0];
    //     errorMessage =
    //       data.errors && firstKey && data.errors[firstKey]
    //         ? data.errors[firstKey][0]
    //         : '';
    //   }
    //   if (data.Message) {
    //     errorMessage = data.Message;
    //   }

    //   yield put(
    //     appActions.setError({
    //       error: {
    //         title: '',
    //         message: errorMessage,
    //       },
    //       type: '',
    //     }),
    //   );
    // } else {
    //   yield put(
    //     appActions.setError({
    //       error: {
    //         title: '',
    //         message: 'Something went wrong.',
    //       },
    //       type: '',
    //     }),
    //   );
    // }
  } catch (error) {
    yield put(
      appActions.setError({
        error: {
          title: '',
          message: 'Something went wrong.',
        },
        type: '',
      }),
    );
  } finally {
    yield put(appActions.removeLoading());
  }
}

export function* authSaga() {
  yield takeLatest(authActions.loginUser, loginUserGenerator);
  yield takeLatest(authActions.checkAuthToken, checkAuthTokenGenerator);
  yield takeLatest(authActions.refreshAuthToken, refreshAuthTokenGenerator);
}

export default authSaga;
