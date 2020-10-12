import {
  Button,
  ButtonProps,
  Fade,
  IconButton,
  IconButtonProps,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CopyIcon from "@material-ui/icons/FileCopyOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import classNames from "classnames";
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  blue,
  graphiteLight,
  gray,
  grayLight,
  skyBlue,
  skyBlueLight,
} from "../../theme/colors";
import { copyToClipboard } from "../../utils/copyToClipboard";
import {
  BrowserNotificationsIcon,
  QrCodeIcon,
  TxHistoryIcon,
} from "../icons/RenIcons";

type ToggleIconButtonProps = IconButtonProps & {
  variant?: "settings" | "notifications";
  pressed?: boolean;
};

const useToggleIconButtonStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.light,
    backgroundColor: grayLight,
    "&:hover": {
      backgroundColor: gray,
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  label: {
    padding: 3,
  },
  icon: {
    fontSize: 20,
  },
  pressed: {
    color: theme.palette.common.white,
    backgroundColor: graphiteLight,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
}));

export const ToggleIconButton: FunctionComponent<ToggleIconButtonProps> = ({
  pressed,
  variant,
  children,
  ...rest
}) => {
  const { label, ...styles } = useToggleIconButtonStyles();
  const className = classNames(styles.root, {
    [styles.pressed]: pressed,
  });
  const Icon = useMemo(() => {
    switch (variant) {
      case "settings":
        return BrowserNotificationsIcon;
      case "notifications":
        return MoreVertIcon;
      default:
        return () => null;
    }
  }, [variant]);
  return (
    <IconButton classes={{ label }} className={className} {...rest}>
      <Icon className={styles.icon} />
      {children}
    </IconButton>
  );
};

const useQrCodeIconButtonStyles = makeStyles((theme) => ({
  root: {
    color: blue,
    backgroundColor: skyBlueLight,
    "&:hover": {
      backgroundColor: skyBlue,
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  label: {
    padding: 3,
  },
  icon: {
    fontSize: 20,
  },
}));

export const QrCodeIconButton: FunctionComponent<IconButtonProps> = (props) => {
  const { icon: iconClassName, ...classes } = useQrCodeIconButtonStyles();
  return (
    <IconButton classes={classes} {...props}>
      <QrCodeIcon className={iconClassName} />
    </IconButton>
  );
};

// TODO: remove
const useTxHistoryIconButtonStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.light,
    backgroundColor: grayLight,
    "&:hover": {
      backgroundColor: gray,
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  label: {
    padding: 3,
  },
  icon: {
    fontSize: 20,
  },
}));

export const TxHistoryIconButton: FunctionComponent<IconButtonProps> = (
  props
) => {
  const { icon: iconClassName, ...classes } = useTxHistoryIconButtonStyles();
  return (
    <IconButton classes={classes} {...props}>
      <TxHistoryIcon className={iconClassName} />
    </IconButton>
  );
};

const useLightIconButtonStyles = makeStyles((theme) => ({
  root: {
    color: blue,
    backgroundColor: skyBlueLight,
    fontSize: 19,
    "&:hover": {
      backgroundColor: skyBlue,
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  label: {
    padding: 10,
  },
}));

const useCopyContentButtonStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "stretch",
    maxWidth: 320,
  },
  content: {
    flexGrow: 2,
    fontSize: 13,
    borderRadius: 20,
    marginRight: 10,
    color: blue,
    backgroundColor: skyBlueLight,
    userSelect: "all",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  copy: {
    flexGrow: 0,
    flexShrink: 0,
  },
}));

type CopyContentButtonProps = {
  content: string;
};

export const CopyContentButton: FunctionComponent<CopyContentButtonProps> = ({
  content,
}) => {
  const styles = useCopyContentButtonStyles();
  const iconClasses = useLightIconButtonStyles();
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (!copied) {
      copyToClipboard(content);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 4000);
    }
  }, [content, copied]);
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        {copied && (
          <Fade in={copied} timeout={1200}>
            <span>Copied!</span>
          </Fade>
        )}
        {!copied && <span>{content}</span>}
      </div>
      <div className={styles.copy}>
        <IconButton classes={iconClasses} onClick={handleClick}>
          <CopyIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
};

const useTransactionDetailsButtonStyles = makeStyles((theme) => ({
  button: {
    fontSize: 13,
    color: blue,
    backgroundColor: skyBlueLight,
    padding: `12px 20px 11px 20px`,
    "&:hover": {
      backgroundColor: skyBlue,
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  chain: {
    color: theme.palette.common.black,
    marginRight: 4,
  },
}));

type TransactionDetailsButton = ButtonProps & {
  chain: string;
  address: string;
};

export const TransactionDetailsButton: FunctionComponent<TransactionDetailsButton> = ({
  chain,
  address,
}) => {
  const styles = useTransactionDetailsButtonStyles();

  return (
    <Button className={styles.button}>
      <span className={styles.chain}>{chain} Tx: </span> <span>{address}</span>
    </Button>
  );
};

const useTransactionHistoryIconButtonStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.light,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: "transparent",
    padding: 6,
    "&:hover": {
      backgroundColor: theme.palette.divider,
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
  },
  label: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.divider,
    padding: 3,
  },
  icon: {
    fontSize: 20,
  },
}));

type TransactionHistoryMenuIconButtonProps = IconButtonProps & {};

export const TransactionHistoryMenuIconButton: FunctionComponent<TransactionHistoryMenuIconButtonProps> = (
  props
) => {
  const {
    icon: iconClassName,
    ...classes
  } = useTransactionHistoryIconButtonStyles();
  return (
    <IconButton classes={classes} {...props}>
      <TxHistoryIcon className={iconClassName} />
    </IconButton>
  );
};

const useWalletConnectionIndicatorStyles = makeStyles((theme) => ({
  root: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: theme.palette.divider,
  },
  connected: {
    backgroundColor: theme.palette.success.main,
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
}));

type WalletConnectionIndicatorProps = {
  status?: "connected" | "warning" | "error";
  className?: string; // TODO: find a better way
};

export const WalletConnectionIndicator: FunctionComponent<WalletConnectionIndicatorProps> = ({
  status,
  className: classNameProp,
}) => {
  const styles = useWalletConnectionIndicatorStyles();
  const className = classNames(styles.root, classNameProp, {
    [styles.connected]: status === "connected",
    [styles.warning]: status === "warning",
    [styles.error]: status === "error",
  });
  return <div className={className} />;
};

const useWalletConnectionStatusButtonStyles = makeStyles((theme) => ({
  root: {
    borderColor: theme.palette.divider,
    "&:hover": {
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.divider,
    },
  },
  indicator: {
    marginRight: 10,
  },
}));

export const WalletConnectionStatusButton: FunctionComponent = () => {
  const {
    indicator: indicatorClassName,
    ...classes
  } = useWalletConnectionStatusButtonStyles();
  return (
    <Button variant="outlined" color="secondary" classes={classes}>
      <WalletConnectionIndicator
        status="warning"
        className={indicatorClassName}
      />
      <span>Connect a Wallet</span>
    </Button>
  );
};
