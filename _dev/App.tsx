import { useCallback } from 'react';

import { MessageOutlined, BellOutlined, BulbOutlined, NotificationOutlined } from '@ant-design/icons';

import Layout from '..';
import Avatar from '../Avatar';

const { Sidebar, Topbar, Content } = Layout;
const { Item, Group } = Sidebar;

function App() {
  const onSearchEnter = useCallback((search: string, clear: () => void) => {
    console.log({ search });
    clear();
  }, []);

  return (
    <>
      <Layout>
        <Topbar
          currentApplication='orbita'
          user={{
            name: 'Eduzz Tecnologia',
            belt: 'Red Belt',
            tag: 'unity'
          }}
        >
          <Topbar.UnitySupportChat />

          <Topbar.Search onEnter={onSearchEnter} />

          <Topbar.Action badgeDot icon={<BulbOutlined />} tooltip='Theme' />
          <Topbar.Action badgeCount={1} active icon={<NotificationOutlined size={25} />} />
          <Topbar.Action badgeCount={999} icon={<MessageOutlined />} label='Chat' />

          <Topbar.UserMenu>
            <Topbar.UserMenuItem icon={<BellOutlined />}>Meus Dados</Topbar.UserMenuItem>
            <Topbar.UserMenuItem icon={<NotificationOutlined />}>Minhas Compras</Topbar.UserMenuItem>

            <Topbar.UserMenuDivider />

            <Topbar.UserMenuGroup label='Contas:'>
              <Topbar.UserMenuItem disabled href='http://google.com' target='_blank' icon={<Avatar>AB</Avatar>}>
                John
              </Topbar.UserMenuItem>
              <Topbar.UserMenuItem href='http://google.com' target='_blank' icon={<Avatar>John</Avatar>}>
                John
              </Topbar.UserMenuItem>
              <Topbar.UserMenuItem href='http://google.com' target='_blank' icon={<Avatar>John Doe</Avatar>}>
                John DoeJohn DoeJohn DoeJohn DoeJohn DoeJohn Doe
              </Topbar.UserMenuItem>
              <Topbar.UserMenuItem>John Doe 2</Topbar.UserMenuItem>
            </Topbar.UserMenuGroup>

            <Topbar.UserMenuDivider />
            <Topbar.UserMenuItem>Sair</Topbar.UserMenuItem>
          </Topbar.UserMenu>
        </Topbar>

        <Sidebar currentLocation={location.pathname}>
          <Group>
            <Item isActive={true}>Resumo</Item>
          </Group>

          <Group>
            <Item isExternal>Relatórios</Item>
            <Item target='_blank'>Financeiro</Item>
            <Item>Soluções</Item>
          </Group>

          <Group label='Submenu'>
            <Item>Item 1</Item>
            <Item>Item 2</Item>
          </Group>

          <Group label='Configurações'>
            <Item>Central de Notificações</Item>
            <Item>Configurações</Item>
          </Group>
        </Sidebar>

        <Content>
          <img src='https://picsum.photos/800/300' className='eduzz-ui-tw-w-full' />
          <p>Teste</p>
        </Content>
      </Layout>
    </>
  );
}

export default App;
