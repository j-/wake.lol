import type { MDXProvider } from '@mdx-js/react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import type { ComponentProps } from 'react';

type MDXProviderProps = ComponentProps<typeof MDXProvider>;
type MDXComponents = MDXProviderProps['components'];

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      {...props}
    />
  ),
  h2: (props) => (
    <Typography
      variant="h5"
      component="h2"
      gutterBottom
      {...props}
    />
  ),
  h3: (props) => (
    <Typography
      variant="h6"
      component="h3"
      gutterBottom
      {...props}
    />
  ),
  p: (props) => (
    <Typography
      variant="body1"
      component="p"
      gutterBottom
      mb={2}
      {...props}
    />
  ),
  a: (props) => (
    props.href === 'https://wake.lol/' ?
      // Internal link.
      <Link color="inherit" {...props} /> :
      // External link.
      <Link target="_blank" {...props} />
  ),
  ul: (props) => (
    <List
      sx={{
        listStyle: 'disc',
        pl: 3,
      }}
      {...props}
    />
  ),
  ol: (props) => (
    <List
      sx={{
        listStyle: 'decimal',
        pl: 3,
      }}
      {...props}
    />
  ),
  li: (props) => (
    <ListItem
      sx={{
        display: 'list-item',
        p: 0,
        mb: 0.5,
      }}
      {...props}
    />
  ),
  hr: (props) => <Divider sx={{ my: 3 }} {...props} />,
  code: (props) => (
    <Box
      component="code"
      sx={(theme) => ({
        fontFamily: theme.typography.fontFamilyMonospace,
        px: 0.75,
        py: 0.25,
        borderRadius: 0.75,
        bgcolor: 'action.hover',
      })}
      {...props}
    />
  ),
  pre: (props) => (
    <Box
      component="pre"
      sx={(theme) => ({
        fontFamily: theme.typography.fontFamilyMonospace,
        p: 2,
        borderRadius: 1.5,
        overflow: 'auto',
        bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
        border: 1,
        borderColor: 'divider',
      })}
      {...props}
    />
  ),
  img: (props) => (
    <Box
      component="img"
      sx={{
        maxWidth: '100%',
        height: 'auto',
        borderRadius: 1,
      }}
      {...props}
    />
  ),
};
