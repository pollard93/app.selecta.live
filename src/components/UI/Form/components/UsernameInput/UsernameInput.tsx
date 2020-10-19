import React, { useEffect, FC, ReactNode, useState, useRef } from 'react';
import { useApolloClient } from 'react-apollo';
import { useUpdateSelfMutation } from '../../../../../API/mutation/updateSelf/updateSelf';
import { getGQLErrorMessage } from '../../../../../utils/functions';
import { IS_USERNAME_UNIQUE_QUERY } from '../../../../../API/query/isUsernameUnique/isUsernameUnique';
import { pushToast } from '../../../../../modules/Toast';
import SearchInput from '../SearchInput/SearchInput';
import Toast from '../../../Toast/Toast';
import { updateStoredGetSelf } from '../../../../../utils/userFunctions';
import TextInput, { TextInputProps } from '../TextInput/TextInput';
import { isUsernameUnique, isUsernameUniqueVariables } from '../../../../../API/query/isUsernameUnique/__generated__/isUsernameUnique';

export interface UsernameInputProps {
  onCompleted?: () => void;
  useTextInput?: boolean; // Uses TextInput instead of SearchInput
  onSubmit?: () => void; // Pass to override internal submission
  inputProps?: Partial<TextInputProps>;
  children: (args: {
    disabled: boolean;
    mutationLoading: boolean;
    queryLoading: boolean;
    onSubmit: () => void;
    value: string;
  }) => ReactNode;
}

const UsernameInput: FC<UsernameInputProps> = (props) => {
  const client = useApolloClient();


  /**
   * Validation
   */
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [valid, setValid] = useState(false);
  const mounted = useRef(false);
  const validate = async () => {
    /**
     * Always clear error and set invalid
     */
    setError(null);
    setValid(false);


    /**
     * If not 3 characters stop here and set error
     */
    if (!/^.{3,}$/.test(value)) {
      setError('Username must be 3 characters or more');
      return false;
    }


    /**
     * Execute request, set loading in process
     */
    try {
      setLoading(true);
      const { data } = await client.query<isUsernameUnique, isUsernameUniqueVariables>({
        query: IS_USERNAME_UNIQUE_QUERY,
        variables: {
          username: value,
        },
      });
      setLoading(false);

      if (data.isUsernameUnique) {
        setValid(true);
        return true;
      }

      setError('Username is alrady taken');
      return false;
    } catch {
      setError('Something went wrong');
      return false;
    }
  };


  /**
   * Validate when value changes
   */
  useEffect(() => {
    /**
     * Don't validate on mount
     */
    if (!mounted.current) {
      mounted.current = true;
      return;
    }


    validate();
  }, [value]);


  /**
   * Update self mutation
   */
  const [mutation, { loading: mutationLoading }] = useUpdateSelfMutation({
    onCompleted: () => {
      updateStoredGetSelf();
      props.onCompleted();
    },
    onError: (e) => {
      pushToast({
        duration: 1000,
        component: (
          <Toast
            type="ERROR"
            content={getGQLErrorMessage(e)}
          />
        ),
        dismissible: false,
      });
    },
  });


  /**
   * Submit
   * Validate before executing request
   */
  const onSubmit = async () => {
    if (!await validate()) return;

    if (props.onSubmit) {
      props.onSubmit();
      return;
    }

    mutation({
      variables: {
        username: value,
      },
    });
  };


  return (
    <>
      {
        props.useTextInput
          ? (
            <TextInput
              name="username"
              value={value}
              onChangeText={setValue}
              placeholder="Enter username"
              autoCompleteType="username"
              autoCapitalize="none"
              returnKeyType="done"
              errors={error && ({ username: { message: error } })}
              onSubmitEditing={onSubmit}
              textContentType="username"
              {...props.inputProps}
            />
          )
          : (
            <SearchInput
              name="username"
              value={value}
              onChangeText={setValue}
              placeholder="Enter username"
              autoCompleteType="username"
              autoCapitalize="none"
              returnKeyType="done"
              errors={error && ({ username: { message: error } })}
              onSubmitEditing={onSubmit}
              loading={loading}
              textContentType="username"
              {...props.inputProps}
            />
          )
      }

      {props.children({
        disabled: !valid,
        mutationLoading,
        queryLoading: loading,
        onSubmit,
        value,
      })}
    </>
  );
};

export default UsernameInput;
