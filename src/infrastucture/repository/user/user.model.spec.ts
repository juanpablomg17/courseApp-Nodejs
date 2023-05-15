import { Users } from './user.model';

describe('Users', () => {
  it('should have a unique id', () => {
    const user = new Users();
    expect(user.id).toBeUndefined();
  });

  it('should have a fullname', () => {
    const user = new Users();
    user.id = '1';
    user.fullname = 'John Doe';
    user.email = 'x@x.com';
    expect(user.fullname).toBe('John Doe');
  });

  it('should have a unique email', () => {
    const user1 = new Users();
    user1.id = '1';
    user1.fullname = 'John Doe';
    user1.email = 'x@x.com';

    const user2 = new Users();
    user2.id = '2';
    user2.fullname = 'Jane Doe';
    user2.email = 'x@x.com';

    expect(user1.email).toEqual('x@x.com');
    expect(user2.email).toEqual('x@x.com');
  });
});